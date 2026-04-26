<?php

namespace App\Http\Controllers;

use App\Http\Requests\Card\CardRequest as StoreRequest;
use App\Http\Requests\Card\UpdateCardRequest as UpdateRequest;
use App\Http\Resources\CardResource;
use App\Models\Card;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use JeroenDesloovere\VCard\VCard;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Throwable;

class CardController extends Controller
{
    public function create()
    {

        if (auth()->user()->cannot('create', Card::class)) {
            return redirect()->back();
        }

        return Inertia::render('card/create');
    }

    protected function storeCardService($services, $card, array &$storedPaths = [])
    {

        foreach ($services as $service) {

            $path = Storage::disk('public')->putFile('services', $service['file']);
            $storedPaths[] = $path;
            $card->services()->create([
                'path' => Storage::url($path),
                'name' => $service['name'],
                'description' => $service['description'],
            ]);
        }
    }

    protected function storeCardGallery($galleries, $card, array &$storedPaths = [])
    {

        foreach ($galleries as $gallery) {

            $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
            $storedPaths[] = $path;
            $card->galleries()->create([
                'path' => Storage::url($path),
                'description' => $gallery['description'],
            ]);
        }
    }

    protected function storeCardLinks($links, $card)
    {

        foreach ($links as $link) {

            $card->socialLinks()->create([
                'name' => $link['name'],
                'url' => $link['url'],
            ]);
        }
    }

    public function store(StoreRequest $request)
    {

        $validated = $request->validated();
        $storedPaths = [];

        try {
            DB::transaction(function () use ($request, $validated, &$storedPaths) {
                $bannerPath = null;
                if ($request->file('banner.file')) {
                    $storedPath = $request->file('banner.file')->store('banners', 'public');
                    $storedPaths[] = $storedPath;
                    $bannerPath = Storage::url($storedPath);
                }

                $avatarPath = null;
                if ($request->file('avatar.file')) {
                    $storedPath = $request->file('avatar.file')->store('avatars', 'public');
                    $storedPaths[] = $storedPath;
                    $avatarPath = Storage::url($storedPath);
                }

                $logoPath = null;
                if ($request->file('logo.file')) {
                    $storedPath = $request->file('logo.file')->store('logos', 'public');
                    $storedPaths[] = $storedPath;
                    $logoPath = Storage::url($storedPath);
                }

                $url = $this->generateUniqueUrl();

                $qrCodePath = $this->generateQRCode(route('card.hello', ['url' => $url]), $request->banner_color);
                $storedPaths[] = $qrCodePath;

                $card = Card::create([
                    'url' => $url,
                    'banner' => $bannerPath,
                    'avatar' => $avatarPath,
                    'logo' => $logoPath,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'job_title' => $request->job_title,
                    'organization' => $request->organization,
                    'user_id' => auth()->id(),
                    'template' => $validated['template'],
                    'banner_color' => $request->banner_color,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'headline' => $request->headline,
                    'address' => $request->address,
                    'location' => $request->location,
                    'qr_code' => $qrCodePath,
                    'business_hours' => $request->business_hours_enabled ? $request->business_hours : null,
                ]);

                if ($request->links and count($request->links) > 0) {
                    $this->storeCardLinks($request->links, $card);
                }

                if (isset($validated['galleries'])) {
                    $this->storeCardGallery($validated['galleries'], $card, $storedPaths);
                }

                if (isset($validated['services'])) {
                    $this->storeCardService($validated['services'], $card, $storedPaths);
                }
            });
        } catch (Throwable $exception) {
            foreach ($storedPaths as $path) {
                Storage::disk('public')->delete($path);
            }

            throw $exception;
        }

        return redirect()->route('dashboard')->with('success', 'Card created successfully!');
    }

    public function show($id)
    {
        $card = Card::where('id', $id)->with('socialLinks', 'galleries', 'services')->firstOrFail();

        if (auth()->user()->cannot('view', $card)) {

            return redirect()->route('dashboard');
        }

        $card = new CardResource($card);

        return Inertia::render('card/show', ['card' => $card]);
    }

    public function edit($id)
    {
        $card = Card::where('id', $id)->with('socialLinks', 'galleries', 'services')->firstOrFail();

        if (auth()->user()->cannot('update', $card)) {

            return redirect()->route('dashboard');
        }

        $card = new CardResource($card);

        return Inertia::render('card/edit', ['card' => $card]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $validated = $request->validated();
        $storedPaths = [];
        $pathsToDelete = [];

        try {
            DB::transaction(function () use ($request, $id, $validated, &$storedPaths, &$pathsToDelete) {
                $card = Card::findOrFail($id);

                $bannerPath = $this->resolveUpdatedImagePath($request, $card, 'banner', 'banners', $storedPaths, $pathsToDelete);
                $avatarPath = $this->resolveUpdatedImagePath($request, $card, 'avatar', 'avatars', $storedPaths, $pathsToDelete);
                $logoPath = $this->resolveUpdatedImagePath($request, $card, 'logo', 'logos', $storedPaths, $pathsToDelete);

                $card->update([
                    'banner' => $bannerPath,
                    'avatar' => $avatarPath,
                    'logo' => $logoPath,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'job_title' => $request->job_title,
                    'organization' => $request->organization,
                    'template' => $validated['template'],
                    'banner_color' => $request->banner_color,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'headline' => $request->headline,
                    'address' => $request->address,
                    'location' => $request->location,
                    'business_hours' => $request->business_hours_enabled ? $request->business_hours : null,
                ]);

                $this->updateSocialLinks($card, $validated);
                $this->updateCardService($card, $validated['services'] ?? [], $storedPaths, $pathsToDelete);
                $this->updateGalleries($card, $validated['galleries'] ?? [], $storedPaths, $pathsToDelete);
            });
        } catch (Throwable $exception) {
            foreach (array_unique($storedPaths) as $path) {
                Storage::disk('public')->delete($path);
            }

            throw $exception;
        }

        foreach (array_unique($pathsToDelete) as $path) {
            $this->deleteOldImage($path);
        }

        return redirect()->back();
    }

    protected function resolveUpdatedImagePath($request, Card $card, string $field, string $directory, array &$storedPaths, array &$pathsToDelete): ?string
    {
        if ($request->hasFile("{$field}.file")) {
            $path = $request->file("{$field}.file")->store($directory, 'public');
            $storedPaths[] = $path;

            if ($card->{$field}) {
                $pathsToDelete[] = $card->{$field};
            }

            return Storage::url($path);
        }

        if ($request->exists("{$field}.path") && $request->input("{$field}.path") === null) {
            if ($card->{$field}) {
                $pathsToDelete[] = $card->{$field};
            }

            return null;
        }

        return $card->{$field};
    }

    protected function updateCardService($card, $services, array &$storedPaths = [], array &$pathsToDelete = [])
    {
        $existingServices = $card->services()->get();

        if (empty($services)) {
            foreach ($existingServices as $service) {
                if ($service->path) {
                    $pathsToDelete[] = $service->path;
                }
            }

            $card->services()->delete();

            return;
        }

        $existingServiceIds = $existingServices->pluck('id')->toArray();

        $requestExistingIds = [];
        $newServices = [];
        $updateServices = [];

        foreach ($services as $service) {
            if (is_numeric($service['id'])) {
                $requestExistingIds[] = (int) $service['id'];
                $updateServices[] = $service;
            } else {
                $newServices[] = $service;
            }
        }

        $servicesToDelete = array_diff($existingServiceIds, $requestExistingIds);
        if (! empty($servicesToDelete)) {
            foreach ($existingServices->whereIn('id', $servicesToDelete) as $service) {
                if ($service->path) {
                    $pathsToDelete[] = $service->path;
                }
            }

            $card->services()->whereIn('id', $servicesToDelete)->delete();
        }

        foreach ($newServices as $service) {
            $serviceData = [
                'name' => $service['name'],
                'description' => $service['description'],
                'path' => $service['path'] ?? '/storage/services/default.jpg',
            ];

            if (isset($service['file']) && $service['file'] !== null) {
                $path = Storage::disk('public')->putFile('services', $service['file']);
                $storedPaths[] = $path;
                $serviceData['path'] = Storage::url($path);
            }

            $card->services()->create($serviceData);
        }

        foreach ($updateServices as $service) {
            $serviceId = (int) $service['id'];
            $existingService = $existingServices->where('id', $serviceId)->first();

            if (! $existingService) {
                continue;
            }

            $serviceData = [
                'name' => $service['name'],
                'description' => $service['description'],
            ];

            if (isset($service['file']) && $service['file'] !== null) {
                if ($existingService->path) {
                    $pathsToDelete[] = $existingService->path;
                }

                $path = Storage::disk('public')->putFile('services', $service['file']);
                $storedPaths[] = $path;
                $serviceData['path'] = Storage::url($path);
            }

            $card->services()->where('id', $serviceId)->update($serviceData);
        }
    }

    protected function updateGalleries($card, $galleries, array &$storedPaths = [], array &$pathsToDelete = [])
    {
        $existingGalleries = $card->galleries()->get();

        if (empty($galleries)) {
            foreach ($existingGalleries as $gallery) {
                if ($gallery->path) {
                    $pathsToDelete[] = $gallery->path;
                }
            }

            $card->galleries()->delete();

            return;
        }

        $existingGalleryIds = $existingGalleries->pluck('id')->toArray();

        $requestExistingIds = [];
        $newGalleries = [];
        $updateGalleries = [];

        foreach ($galleries as $gallery) {
            if (is_numeric($gallery['id'])) {
                $requestExistingIds[] = (int) $gallery['id'];
                $updateGalleries[] = $gallery;
            } else {
                $newGalleries[] = $gallery;
            }
        }

        $galleriesToDelete = array_diff($existingGalleryIds, $requestExistingIds);
        if (! empty($galleriesToDelete)) {
            foreach ($existingGalleries->whereIn('id', $galleriesToDelete) as $gallery) {
                if ($gallery->path) {
                    $pathsToDelete[] = $gallery->path;
                }
            }

            $card->galleries()->whereIn('id', $galleriesToDelete)->delete();
        }

        foreach ($newGalleries as $gallery) {
            if (! isset($gallery['file']) || $gallery['file'] === null) {
                continue;
            }

            $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
            $storedPaths[] = $path;
            $galleryData = [
                'description' => $gallery['description'],
                'path' => Storage::url($path),
            ];

            $card->galleries()->create($galleryData);
        }

        foreach ($updateGalleries as $gallery) {
            $galleryId = (int) $gallery['id'];
            $existingGallery = $existingGalleries->where('id', $galleryId)->first();

            if (! $existingGallery) {
                continue;
            }

            $galleryData = [
                'description' => $gallery['description'],
            ];

            if (isset($gallery['file']) && $gallery['file'] !== null) {
                if ($existingGallery->path) {
                    $pathsToDelete[] = $existingGallery->path;
                }

                $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
                $storedPaths[] = $path;
                $galleryData['path'] = Storage::url($path);
            }

            $card->galleries()->where('id', $galleryId)->update($galleryData);
        }
    }

    protected function updateSocialLinks($card, $validated)
    {
        $card->socialLinks()->delete();

        if (! empty($validated['links'])) {
            foreach ($validated['links'] as $link) {
                $card->socialLinks()->create([
                    'name' => $link['name'],
                    'url' => $link['url'],
                ]);
            }
        }
    }

    public function settings($id)
    {

        $card = Card::findOrFail($id);

        $validated = request()->validate([
            'personalizedurl' => [
                'required',
                'string',                // Must be a string
                'max:255',               // Max length of 255 characters
                'unique:cards,url,'.$card->id,
                'regex:/^[a-zA-Z0-9]+$/', // Only letters (a-z, A-Z) and numbers (0-9), no spaces or special characters
            ],
            'cardname' => [
                'nullable',
                'string',                // Must be a string
                'max:255',               // Max length of 255 characters
            ],

            'status' => [
                'required',
                'boolean',               // Must be a boolean
            ],
        ]);

        if ($card->url !== $validated['personalizedurl']) {
            $qrCodePath = $this->generateQRCode(route('card.hello', ['url' => $validated['personalizedurl']]), $card->banner_color);
            $card->qr_code = $qrCodePath;
            $card->url = $validated['personalizedurl'];
        }

        if ($card->cardname !== $validated['cardname']) {
            $card->cardname = $validated['cardname'];
        }

        if ($card->status !== $validated['status']) {
            $card->status = $validated['status'];
        }

        if ($card->isDirty()) {
            $card->save();
        }

        return to_route('card.show', $card->id);
    }

    public function delete($id)
    {

        $card = Card::findOrFail($id);

        $card->delete();

        return redirect()->route('dashboard');
    }

    public function downloadVCard($id)
    {

        $this->updateTotalSaves($id);

        $card = Card::findOrFail($id);

        // Create a new vCard instance
        $vcard = new VCard;

        // Add personal data
        $vcard->addName($card->last_name, $card->first_name);
        $vcard->addEmail($card->email);
        $vcard->addPhoneNumber($card->phone, 'WORK');
        $vcard->addCompany($card->organization);
        $vcard->addJobtitle($card->job_title);
        $vcard->addPhoneNumber($card->phone);
        // $vcard->addAddress(null, null, $card->address, $card->location);

        // Add social links (optional, non-standard but supported by some clients)
        foreach ($card->socialLinks ?? [] as $link) {
            if (! empty($link['url'])) {
                $vcard->addUrl($link['url'], strtoupper($link['name']));
            }
        }

        // Optionally add a photo (if avatar exists)
        if (! empty($card->avatar)) {
            $avatarPath = storage_path('app/public/'.$card->avatar);
            if (file_exists($avatarPath)) {
                $vcard->addPhoto($avatarPath);
            }
        }

        // Generate the vCard content
        // $vcardContent = $vcard->getOutput();

        // Return as a downloadable file
        // return response($vcardContent, 200, [
        //     'Content-Type' => 'text/vcard',
        //     'Content-Disposition' => 'attachment; filename="contact.vcf"',
        // ]);
        //

        // return $vcard->download();

        return response($vcard->getOutput(), 200, [
            'Content-Type' => 'text/vcard; charset=utf-8',
            'Content-Disposition' => 'inline; filename="contact.vcf"',
        ]);

    }

    protected function generateUniqueUrl($length = 8)
    {
        do {
            // Generate a random string of specified length
            $uniqueString = Str::random($length);

            // Check if it exists in the cards table url column
            $exists = Card::where('url', $uniqueString)->exists();
        } while ($exists); // Keep generating if it already exists

        return $uniqueString;
    }

    protected function generateQrCode($url, $color)
    {

        $size = 400;
        [$r, $g, $b] = sscanf($color, '#%02x%02x%02x');

        $qrCode = QrCode::format('png')
            ->size($size)
            ->color($r, $g, $b)
            ->generate($url);

        $path = 'qrcodes/'.Str::random(40).'.png';
        Storage::disk('public')->put($path, $qrCode);

        return $path;

    }

    protected function deleteOldImage($path)
    {
        if ($path) {
            $relativePath = parse_url($path, PHP_URL_PATH) ?: $path;
            $relativePath = ltrim(Str::after($relativePath, '/storage/'), '/');

            if (Storage::disk('public')->exists($relativePath)) {
                Storage::disk('public')->delete($relativePath);
            }
        }
    }

    public function updateTotalSaves($id)
    {
        $card = Card::where('id', $id)->firstOrFail();
        $card->total_saves++;
        $card->save();

        return response()->json(['success' => true]);
    }
}
