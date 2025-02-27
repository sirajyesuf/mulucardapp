import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import MuluCard from '@/pages/card/card';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, Facebook, Globe, Instagram, Linkedin, LoaderCircle, Mail, Phone, Twitter, Youtube } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];
interface CardForm {
    avatar: File | null;
    logo: File | null;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    background_color: string;
    links: {
        name: string;
        value: string;
        label: string;
        Icon: React.ComponentType;
        placeholder: string;
        ty;
    }[];
}

export default function CreateCard() {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleAvatarChange = (file: File | null, previewUrl: string | null) => {
        console.log(file);
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
        background_color: colors[0],
        links: [
            { name: 'email', value: '', label: 'Email', Icon: Mail, placeholder: 'example@example.com', type: 'email' },
            { name: 'phone', value: '', label: 'Phone', Icon: Phone, placeholder: '123-456-7890', type: 'tel' },
            { name: 'website', value: '', label: 'Website', Icon: Globe, placeholder: 'https://example.com', type: 'url' },
            { name: 'facebook', value: '', label: 'Facebook', Icon: Facebook, placeholder: 'https://facebook.com/example', type: 'url' },
            { name: 'twitter', value: '', label: 'Twitter', Icon: Twitter, placeholder: 'https://twitter.com/example', type: 'url' },
            { name: 'instagram', value: '', label: 'Instagram', Icon: Instagram, placeholder: 'https://instagram.com/example', type: 'url' },
            { name: 'linkedin', value: '', label: 'LinkedIn', Icon: Linkedin, placeholder: 'https://linkedin.com/example', type: 'url' },
            { name: 'youtube', value: '', label: 'Youtube', Icon: Youtube, placeholder: 'https://youtube.com/example', type: 'url' },
        ],
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
                            background_color={data.background_color}
                            links={data.links}
                        />
                    </div>
                    <div className="col-span-3 border-none p-2">
                        <Tabs defaultValue="display" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="display">Display</TabsTrigger>
                                <TabsTrigger value="account">Information</TabsTrigger>
                                <TabsTrigger value="links">Links</TabsTrigger>
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
                                        <ImageUpload id="avatar-upload" label="Upload Avatar" onImageChange={handleAvatarChange} />
                                        <ImageUpload id="logo-upload" label="Upload Logo" onImageChange={handleLogoChange} />
                                        <div className="flex flex-row gap-4 rounded-lg border-2 p-2">
                                            {colors.map((color, index) => (
                                                <div key={index} className="cursor-pointer rounded-full border-2 p-2">
                                                    <div className="flex items-center space-x-2">
                                                        <div
                                                            className="flex h-10 w-10 items-center justify-center rounded-full"
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => setData('background_color', color)}
                                                        >
                                                            {color === data.background_color && <Check color="white" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal</CardTitle>
                                        <CardDescription>Make changes to your account here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="fname">First Name</Label>
                                            <Input
                                                id="fname"
                                                value={data.first_name}
                                                onChange={(e) => setData('first_name', e.target.value)}
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="lname">Last Name</Label>
                                            <Input
                                                id="lname"
                                                value={data.last_name}
                                                onChange={(e) => setData('last_name', e.target.value)}
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="organization">Organization</Label>
                                            <Input
                                                id="organization"
                                                value={data.organization}
                                                onChange={(e) => setData('organization', e.target.value)}
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="jobtitle">Job Title</Label>
                                            <Input
                                                id="jobtitle"
                                                value={data.job_title}
                                                onChange={(e) => setData('job_title', e.target.value)}
                                                disabled={processing}
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
                                        {/* <div className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                        <div className="text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold">
                                            <Mail />
                                            Email
                                        </div>
                                        <Input type="email" width="50px" className="h-[50px]" placeholder="example@example.com" />
                                        <Input type="text" width="50px" className="h-[50px]" placeholder="Email Address" />
                                    </div>
                                    <div className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                        <div className="text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold">
                                            <Phone />
                                            Call
                                        </div>
                                        <Input type="tel" width="50px" className="h-[50px]" placeholder="example@example.com" />
                                        <Input type="text" width="50px" className="h-[50px]" placeholder="Email Address" />
                                    </div> */}
                                        {data.links.map((link, index) => (
                                            <div key={index} className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                                <div className="text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold">
                                                    <link.Icon />
                                                    {link.label}
                                                </div>
                                                <Input
                                                    type={link.type}
                                                    className="h-[50px] w-full"
                                                    placeholder={link.placeholder}
                                                    value={link.value}
                                                    onChange={(e) => {
                                                        const updatedLinks = [...data.links];
                                                        updatedLinks[index] = { ...updatedLinks[index], value: e.target.value };
                                                        setData('links', updatedLinks);
                                                    }}
                                                    disabled={processing}
                                                />
                                            </div>
                                        ))}
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
