import AppLayout from '@/layouts/app-layout';
import MuluCard from '@/pages/card/card';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import FileUpload from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface CardForm {
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
}

export default function CreateCard() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm<CardForm>({
        first_name: '',
        last_name: '',
        organization: '',
        job_title: '',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="m-2 grid h-full flex-1 grid-cols-5 gap-4 rounded-xl border-none p-4">
                <div className="col-span-2 border-none p-2">
                    <MuluCard
                        previewUrl={previewUrl}
                        first_name={data.first_name}
                        last_name={data.last_name}
                        organization={data.organization}
                        job_title={data.job_title}
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
                                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <FileUpload setPreviewUrl={setPreviewUrl} />
                                </CardContent>
                                {/* <CardFooter>
                                    <Button>Save changes</Button>
                                </CardFooter> */}
                            </Card>
                        </TabsContent>

                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal</CardTitle>
                                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="fname">First Name</Label>
                                        <Input
                                            id="fname"
                                            defaultValue="first name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            disabled={processing}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="lname">Last Name</Label>
                                        <Input
                                            id="lname"
                                            defaultValue="last name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            disabled={processing}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="organization">Organization</Label>
                                        <Input
                                            id="organization"
                                            defaultValue="organization"
                                            value={data.organization}
                                            onChange={(e) => setData('organization', e.target.value)}
                                            disabled={processing}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="jobtitle">Job Title</Label>
                                        <Input
                                            id="jobtitle"
                                            defaultValue="job title"
                                            value={data.job_title}
                                            onChange={(e) => setData('job_title', e.target.value)}
                                            disabled={processing}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {/* <Button>Save changes</Button> */}
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
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
                                <CardFooter>
                                    <Button>Save password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
