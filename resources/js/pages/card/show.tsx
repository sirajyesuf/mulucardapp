import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Copy, Download, Edit } from 'lucide-react';

import MuluCard from './card';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
// Type for individual social link
interface SocialLink {
    id: number;
    name: string;
    url: string;
    card_id: number;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

// Type for the card object
type Card = {
    id: number;
    url: string;
    user_id: number;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string | null;
    phone: string | null;
    avatar: string | null; // Path to avatar file or null
    logo: string | null; // Path to logo file or null
    banner_color: string | null; // Hex color code or null
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    social_links: SocialLink[];
    headline: string;
    qr_code: string;
};

export default function ShowCard() {
    const { props } = usePage();
    const card = props.card as Card | undefined;

    const DownloadQRCode = () => {
        const link = document.createElement('a');
        link.href = `/storage/${card?.qr_code}`;
        link.download = 'qr_code.png';
        link.click();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid h-full flex-1 grid-cols-1 gap-2 rounded-xl border-none p-4 md:grid-cols-3">
                <div className="hidden rounded-lg border-2 p-4 md:block">
                    <div className="col-span-1 rounded-lg border-2 p-2 shadow-xl">
                        <MuluCard
                            previewUrl={card?.avatar}
                            previewLogo={card?.logo}
                            first_name={card?.first_name}
                            last_name={card?.last_name}
                            organization={card?.organization}
                            job_title={card?.job_title}
                            phone={card?.phone}
                            email={card?.email}
                            banner_color={card?.banner_color}
                            links={card?.links}
                            address={card?.address}
                            location={card?.location}
                            headline={card?.headline}
                        />
                    </div>
                </div>

                <div className="col-span-2 rounded-lg border-2 p-4">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="flex h-16 w-full flex-row justify-between px-4">
                            <div className="space-x-4">
                                <TabsTrigger value="account" className="font-bold">
                                    Share
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="font-bold">
                                    Settings
                                </TabsTrigger>
                            </div>

                            <div className="flex flex-row gap-4">
                                <Button variant="outline" className="cursor-pointer" onClick={() => DownloadQRCode()}>
                                    <Download size={100} />
                                </Button>
                                <Button variant="outline" className="bg-green-600 hover:bg-green-800">
                                    <Edit size={100} color="white" />

                                    <span className="text-white capitalize"> Edit</span>
                                </Button>
                            </div>
                        </TabsList>
                        <TabsContent value="account">
                            <Card className="">
                                <CardContent className="grid h-[100%] items-center justify-center gap-4 border-none border-blue-600 bg-[#f7fafc] p-2 md:grid-cols-1 lg:grid-cols-2">
                                    <div className="flex items-center justify-center border-none">
                                        <div className="h-[400px] w-[400px] rounded-3xl border-8 border-gray-500 p-4">
                                            <img src={`/storage/${card?.qr_code}`} alt="" className="object-cover" />
                                        </div>
                                    </div>

                                    <div className="flex h-full items-center justify-center rounded-lg border-none p-4">
                                        <Button className="w-full rounded-lg border-2 p-2 py-8" variant="outline">
                                            <Copy size={100} />
                                            <span className="text-lg font-extrabold text-black capitalize">copy link</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Settings</CardTitle>
                                    <CardDescription>Edit the details of this card.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="personalized">Personalized Link</Label>
                                        <Input id="personalized" type="text" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between rounded-lg border-2 border-red-400 px-4 py-4">
                                        <div className="flex flex-col">
                                            <p className="font-extrabold">Delete</p>
                                            <p className="text-mute font-normal">Delete this card permanently.</p>
                                        </div>

                                        <Button variant="outline" className="border-2 border-red-400 font-extrabold text-red-500 hover:text-red-700">
                                            Delete Card
                                        </Button>
                                    </div>
                                </CardContent>
                                {/* <CardFooter>
                                    <Button>Save password</Button>
                                </CardFooter> */}
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
