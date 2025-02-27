import FileUpload from '@/components/file-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import MuluCard from '@/pages/card/card';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];
interface CardForm {
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    background_color: string;
}

export default function CreateCard() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);

    const colors = ['#3a59ae', '#a580e5', '#4a4a4a'];

    const { data, setData, processing } = useForm<CardForm>({
        first_name: '',
        last_name: '',
        organization: '',
        job_title: '',
        background_color: colors[0],
    });

    const handlePictureChange = (file: File | null, url: string | null) => {
        setPreviewUrl(url);
    };

    const handleLogoChange = (file: File | null, url: string | null) => {
        setPreviewLogo(url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="m-2 grid h-full flex-1 grid-cols-5 gap-4 rounded-xl border-none p-4">
                <div className="col-span-2 rounded-lg border-2 p-2 shadow-xl">
                    <MuluCard
                        previewUrl={previewUrl}
                        previewLogo={previewLogo}
                        first_name={data.first_name}
                        last_name={data.last_name}
                        organization={data.organization}
                        job_title={data.job_title}
                        background_color={data.background_color}
                    />
                </div>
                <div className="col-span-3 border-none p-2">
                    <Tabs defaultValue="display" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="display">Display</TabsTrigger>
                            <TabsTrigger value="account">Information</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="display">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Display</CardTitle>
                                    <CardDescription>Make changes to your account here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FileUpload id="picture-upload" label="Select a picture to upload" onFileChange={handlePictureChange} />
                                    <FileUpload id="logo-upload" label="Select a logo to upload" onFileChange={handleLogoChange} />
                                    <div className="flex flex-row gap-4 rounded-lg border-2 p-2">
                                        {colors.map((color, index) => (
                                            <div key={index} className="cursor-pointer rounded-full border-2 p-2">
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className="flex h-10 w-10 items-center justify-center rounded-full"
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => setData('background_color', color)}
                                                    >
                                                        {color === data.background_color && <Check color="white" />}{' '}
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
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>Change your password here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
