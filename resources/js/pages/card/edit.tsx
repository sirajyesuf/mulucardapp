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
import { Check, LoaderCircle, Upload, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Edit Card', href: null },
];

interface CardForm {
    id: number;
    avatar: File | null | string;
    logo: File | null | string;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string;
    phone: string;
    banner_color: string;
    links: { name: string; url: string; placeholder: string }[];
    location: string;
    address: string;
    headline: string;
    galleries: any[];
    services: any[];
}

interface EditCardProps {
    card: CardForm;
}

export default function EditCard({ card }: EditCardProps) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(typeof card.avatar === 'string' ? card.avatar : null);
    const [logoPreview, setLogoPreview] = useState<string | null>(typeof card.logo === 'string' ? card.logo : null);
    const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
    const [logoFileName, setLogoFileName] = useState<string | null>(null);
    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const logoInputRef = useRef<HTMLInputElement | null>(null);
    const colors = ['#3a59ae', '#a580e5', '#6dd3c7', '#3bb55d', '#ffc631', '#ff8c39', '#ea3a2e', '#ee85dd', '#4a4a4a'];

    const defaultLinks = [
        { name: 'website', url: '', placeholder: 'https://example.com' },
        { name: 'facebook', url: '', placeholder: 'https://facebook.com/example' },
        { name: 'twitter', url: '', placeholder: 'https://twitter.com/example' },
        { name: 'instagram', url: '', placeholder: 'https://instagram.com/example' },
        { name: 'linkedin', url: '', placeholder: 'https://linkedin.com/example' },
        { name: 'youtube', url: '', placeholder: 'https://youtube.com/example' },
    ];

    const { data, setData, put, processing, errors } = useForm<CardForm>({
        id: card.id,
        avatar: card.avatar,
        logo: card.logo,
        first_name: card.first_name || '',
        last_name: card.last_name || '',
        organization: card.organization || '',
        job_title: card.job_title || '',
        phone: card.phone || '',
        email: card.email || '',
        banner_color: card.banner_color || colors[0],
        links: card.links?.length > 0 ? card.links : defaultLinks,
        address: card.address || '',
        location: card.location || '',
        headline: card.headline || '',
        services: card.services || [],
        galleries: card.galleries || [],
    });

    const handleFileChange = (field: 'avatar' | 'logo') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            if (field === 'avatar') {
                if (avatarPreview && avatarPreview !== card.avatar) URL.revokeObjectURL(avatarPreview);
                setAvatarPreview(previewUrl);
                setAvatarFileName(file.name);
                setData('avatar', file);
            } else {
                if (logoPreview && logoPreview !== card.logo) URL.revokeObjectURL(logoPreview);
                setLogoPreview(previewUrl);
                setLogoFileName(file.name);
                setData('logo', file);
            }
        } else {
            if (field === 'avatar') {
                if (avatarPreview && avatarPreview !== card.avatar) URL.revokeObjectURL(avatarPreview);
                setAvatarPreview(typeof card.avatar === 'string' ? card.avatar : null);
                setAvatarFileName(null);
                setData('avatar', card.avatar);
            } else {
                if (logoPreview && logoPreview !== card.logo) URL.revokeObjectURL(logoPreview);
                setLogoPreview(typeof card.logo === 'string' ? card.logo : null);
                setLogoFileName(null);
                setData('logo', card.logo);
            }
            if (file) alert('Please select an image file (e.g., PNG, JPEG)');
        }
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        put(route('card.update', card.id), {
            onSuccess: () => {
                console.log('Update successful!');
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeFile = (field: 'avatar' | 'logo') => {
        if (field === 'avatar') {
            if (avatarPreview && avatarPreview !== card.avatar) URL.revokeObjectURL(avatarPreview);
            setAvatarPreview(typeof card.avatar === 'string' ? card.avatar : null);
            setAvatarFileName(null);
            setData('avatar', card.avatar);
        } else {
            if (logoPreview && logoPreview !== card.logo) URL.revokeObjectURL(logoPreview);
            setLogoPreview(typeof card.logo === 'string' ? card.logo : null);
            setLogoFileName(null);
            setData('logo', card.logo);
        }
    };

    const triggerAvatarInputClick = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    };

    const triggerLogoInputClick = () => {
        if (logoInputRef.current) {
            logoInputRef.current.click();
        }
    };

    useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview !== card.avatar) URL.revokeObjectURL(avatarPreview);
            if (logoPreview && logoPreview !== card.logo) URL.revokeObjectURL(logoPreview);
        };
    }, [avatarPreview, logoPreview, card.avatar, card.logo]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Card" />
            <form onSubmit={submit} className="space-y-6 p-4">
                <div className="flex justify-between gap-4">
                    <Button variant="destructive" asChild>
                        <a href="/dashboard">Cancel</a>
                    </Button>
                    <Button type="submit" disabled={processing} className="bg-green-600 text-white">
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Update Card
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-5">
                    <div className="hidden md:col-span-2 md:block">
                        <Card className="sticky top-4">
                            <CardContent className="p-4">
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
                                    galleries={data.galleries}
                                    services={data.services}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-3">
                        <Tabs defaultValue="personal_information" className="w-full">
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
                                        <CardDescription>Update your card's display settings.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="w-full rounded-lg border-2 p-6 text-center hover:border-dashed">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-lg bg-gray-100 p-4">
                                                    <Upload className="text-muted-foreground mx-auto h-6 w-6" />
                                                </div>
                                                <p className="text-foreground mt-2 text-sm font-medium">Upload Avatar</p>

                                                {avatarFileName || avatarPreview ? (
                                                    <div className="bg-muted/50 mx-auto mt-4 flex w-full max-w-xs items-center justify-between gap-2 rounded-md border px-3 py-2">
                                                        <span className="truncate text-sm">
                                                            {avatarFileName || (typeof card.avatar === 'string' ? 'Existing Avatar' : 'No Avatar')}
                                                        </span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeFile('avatar')}
                                                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-6 w-6 rounded-full p-0"
                                                        >
                                                            <X className="h-4 w-4" />
                                                            <span className="sr-only">Remove file</span>
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => triggerAvatarInputClick()}
                                                        className="mt-4"
                                                    >
                                                        Choose File
                                                    </Button>
                                                )}

                                                <input
                                                    ref={avatarInputRef}
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange('avatar')}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full rounded-lg border-2 p-6 text-center hover:border-dashed">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="rounded-lg bg-gray-100 p-4">
                                                    <Upload className="text-muted-foreground mx-auto h-6 w-6" />
                                                </div>
                                                <p className="text-foreground mt-2 text-sm font-medium">Upload Logo</p>

                                                {logoFileName || logoPreview ? (
                                                    <div className="bg-muted/50 mx-auto mt-4 flex w-full max-w-xs items-center justify-between gap-2 rounded-md border px-3 py-2">
                                                        <span className="truncate text-sm">
                                                            {logoFileName || (typeof card.logo === 'string' ? 'Existing Logo' : 'No Logo')}
                                                        </span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeFile('logo')}
                                                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-6 w-6 rounded-full p-0"
                                                        >
                                                            <X className="h-4 w-4" />
                                                            <span className="sr-only">Remove file</span>
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => triggerLogoInputClick()}
                                                        className="mt-4"
                                                    >
                                                        Choose File
                                                    </Button>
                                                )}

                                                <input
                                                    ref={logoInputRef}
                                                    id="logo-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange('logo')}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-row flex-wrap gap-2 rounded-lg border-2 p-2">
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
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Update your personal details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="first_name">First Name</Label>
                                                <Input
                                                    id="first_name"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="last_name">Last Name</Label>
                                                <Input
                                                    id="last_name"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="organization">Organization</Label>
                                                <Input
                                                    id="organization"
                                                    value={data.organization}
                                                    onChange={(e) => setData('organization', e.target.value)}
                                                    disabled={processing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="job_title">Job Title</Label>
                                                <Input
                                                    id="job_title"
                                                    value={data.job_title}
                                                    onChange={(e) => setData('job_title', e.target.value)}
                                                    disabled={processing}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    disabled={processing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    disabled={processing}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="headline">Headline</Label>
                                            <Textarea
                                                id="headline"
                                                value={data.headline}
                                                onChange={(e) => setData('headline', e.target.value)}
                                                disabled={processing}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="links">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Social Links</CardTitle>
                                        <CardDescription>Manage your social media connections</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {data.links.map((link, index) => {
                                            const Icon = socialIconMap[link.name.toLowerCase()];
                                            return (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        {Icon && <Icon className="h-5 w-5" />}
                                                        <Label className="capitalize">{link.name}</Label>
                                                    </div>
                                                    <Input
                                                        type="url"
                                                        placeholder={link.placeholder}
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const newLinks = [...data.links];
                                                            newLinks[index].url = e.target.value;
                                                            setData('links', newLinks);
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
                                        <CardDescription>Update your location details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                disabled={processing}
                                            />
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
