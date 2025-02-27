import ImageUpload from '@/components/image-upload';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { socialIconMap } from '@/lib/socialIcons';
import MuluCard from '@/pages/card/card';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];
interface CardForm {
    avatar: File | null;
    logo: File | null;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string;
    phone: string;
    banner_color: string;
    links: {
        name: string;
        url: string;
        placeholder: string;
    }[];
    location: string;
    address: string;
    headline: string;
}

export default function CreateCard() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleAvatarChange = (file: File | null, previewUrl: string | null) => {
        setData('avatar', file);
        setAvatarPreview(previewUrl);
    };

    const handleLogoChange = (file: File | null, previewUrl: string | null) => {
        setData('logo', file);
        setLogoPreview(previewUrl);
    };

    const colors = ['#3a59ae', '#a580e5', '#4a4a4a'];

    const { data, setData, post, processing, errors } = useForm<CardForm>({
        avatar: '',
        logo: '',
        first_name: '',
        last_name: '',
        organization: '',
        job_title: '',
        phone: '',
        email: '',
        banner_color: colors[0],
        links: [
            { name: 'website', url: '', placeholder: 'https://example.com' },
            { name: 'facebook', url: '', placeholder: 'https://facebook.com/example' },
            { name: 'twitter', url: '', placeholder: 'https://twitter.com/example' },
            { name: 'instagram', url: '', placeholder: 'https://instagram.com/example' },
            { name: 'linkedin', url: '', placeholder: 'https://linkedin.com/example' },
            { name: 'youtube', url: '', placeholder: 'https://youtube.com/example' },
        ],
        address: '',
        location: '',
        headline: '',
    });

    // const handlePictureChange = (file: File | null, url: string) => {
    //     setData('avatar', url);
    // };

    // const handleLogoChange = (file: File | null, url: string) => {
    //     setData('logo', url);
    // };

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post(route('card.store'), {
            onSuccess: () => {
                console.log('Upload successful!');
            },
            onError: (errors) => {
                console.log('Upload errors:', errors);
            },
            // Ensure multipart/form-data is used (Inertia does this automatically with files)
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <form onSubmit={submit}>
                <div className="m-2 flex flex-row justify-between rounded-lg border-2 p-2 shadow-none">
                    <Button variant="destructive" className="cursor-pointer">
                        Cancel
                    </Button>

                    <Button variant="outline" type="submit" className="cursor-pointer bg-green-600 text-white" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create Card
                    </Button>
                </div>
                <div className="m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5">
                    <div className="shahasErrorsdow-xl col-span-2 hidden rounded-lg border-2 p-2 md:block">
                        <MuluCard
                            previewUrl={avatarPreview}
                            previewLogo={logoPreview}
                            first_name={data.first_name}
                            last_name={data.last_name}
                            organization={data.organization}
                            job_title={data.job_title}
                            phone={data.phone}
                            email={data.email}
                            banner_color={data.banner_color}
                            links={data.links}
                            address={data.address}
                            location={data.location}
                            headline={data.headline}
                        />
                    </div>
                    <div className="col-span-3 border-none p-2">
                        <Tabs defaultValue="display" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="display">Display</TabsTrigger>
                                <TabsTrigger value="personal_information">Information</TabsTrigger>
                                <TabsTrigger value="links">Links</TabsTrigger>
                                <TabsTrigger value="location">Location</TabsTrigger>
                            </TabsList>
                            <TabsContent value="display">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Display</CardTitle>
                                        <CardDescription>Make changes to your account here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* <FileUpload id="picture-upload" label="Select a picture to upload" onFileChange={handlePictureChange} />
                                        <FileUpload id="logo-upload" label="Select a logo to upload" onFileChange={handleLogoChange} /> */}
                                        <div>
                                            <ImageUpload id="avatar-upload" label="Upload Avatar" onImageChange={handleAvatarChange} />
                                            <InputError message={errors.avatar} className="mt-2" />
                                        </div>

                                        <div>
                                            <ImageUpload id="logo-upload" label="Upload Logo" onImageChange={handleLogoChange} />
                                            <InputError message={errors.logo} className="mt-2" />
                                        </div>
                                        <div className="flex flex-row gap-4 rounded-lg border-2 p-2">
                                            {colors.map((color, index) => (
                                                <div key={index} className="cursor-pointer rounded-full border-2 p-2">
                                                    <div className="flex items-center space-x-2">
                                                        <div
                                                            className="flex h-10 w-10 items-center justify-center rounded-full"
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => setData('banner_color', color)}
                                                        >
                                                            {color === data.banner_color && <Check color="white" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="personal_information">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal</CardTitle>
                                        <CardDescription>Make changes to your account here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="fname">First Name</Label>
                                                <Input
                                                    id="fname"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.first_name} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="lname">Last Name</Label>
                                                <Input
                                                    id="lname"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.last_name} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="organization">Organization</Label>
                                                <Input
                                                    id="organization"
                                                    value={data.organization}
                                                    onChange={(e) => setData('organization', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.organization} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="jobtitle">Job Title</Label>
                                                <Input
                                                    id="jobtitle"
                                                    value={data.job_title}
                                                    onChange={(e) => setData('job_title', e.target.value)}
                                                    disabled={processing}
                                                />

                                                <InputError message={errors.job_title} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    disabled={processing}
                                                />

                                                <InputError message={errors.phone} className="mt-2" />
                                            </div>

                                            <div className="space-y-1">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    disabled={processing}
                                                />

                                                <InputError message={errors.email} className="mt-2" />
                                            </div>
                                        </div>

                                        <div>
                                            <Textarea
                                                className="h-30 w-full"
                                                placeholder="enter your headline text"
                                                value={data.headline}
                                                onChange={(e) => setData('headline', e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="links">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Links</CardTitle>
                                        <CardDescription>add social media links.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {data.links.map((link, index) => {
                                            const Icon = socialIconMap[link.name.toLowerCase()] || Globe;
                                            return (
                                                <div key={index} className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                                    <div className="text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold">
                                                        <Icon className="h-6 w-6" />
                                                        {link.name}
                                                    </div>
                                                    <Input
                                                        type="url"
                                                        className="h-[50px] w-full"
                                                        placeholder={link.placeholder}
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updatedLinks = [...data.links];
                                                            updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                                                            setData('links', updatedLinks);
                                                        }}
                                                        disabled={processing}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="location">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Location</CardTitle>
                                        <CardDescription>Enter your address and location details.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.address} className="mt-2" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="lname">Location</Label>
                                            <Input
                                                id="location"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
