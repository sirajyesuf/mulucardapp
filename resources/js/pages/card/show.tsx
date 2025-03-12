import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Card as CardType } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Check, Copy, Download, Edit } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import MuluCard from './card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ShowCard() {
    const [isCopied, setIsCopied] = useState(false);
    const { props } = usePage();
    const card = props.card as CardType;
    console.log(card);

    const { data, setData, post, get, errors, reset } = useForm({
        personalizedurl: '',
    });

    const DownloadQRCode = () => {
        const link = document.createElement('a');
        link.href = `/storage/${card?.qr_code}`;
        link.download = 'qr_code.png';
        link.click();
    };

    const EditCard = () => {
        console.log(card);
        router.get(route('card.edit', { id: card?.id }));
    };

    const personalizedURL = (event) => {
        event.preventDefault();

        post(route('card.personalizedurl', { id: card.id }), {
            onFinish: () => {
                console.log('Upload successful!');
                reset();
                toast.success('URL has been updated');
            },
            onSuccess: () => {
                console.log('Upload successful!');
            },
            onError: (errors) => {
                console.log('Upload errors:', errors);
            },
        });
    };

    const deleteCard = () => {
        get(route('card.delete', { id: card.id }), {
            onFinish: () => {
                console.log('Upload successful!');
                reset();
                toast.success('Card has been deleted');
            },
            onSuccess: () => {
                console.log('Upload successful!');
            },
            onError: (errors) => {
                console.log('Upload errors:', errors);
            },
        });
    };

    const handleCopy = async () => {
        try {
            // Replace with your actual link to copy
            const linkToCopy = route('card.hello', { url: card.url });
            await navigator.clipboard.writeText(linkToCopy);
            setIsCopied(true);

            // Reset after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid h-full flex-1 grid-cols-1 gap-2 rounded-xl border-none p-4 md:grid-cols-3">
                <div className="col-span-1 hidden rounded-sm border-2 p-0 md:block">
                    <ScrollArea className="h-[800px] pr-2">
                        <MuluCard
                            avatar={card?.avatar}
                            logo={card?.logo}
                            first_name={card?.first_name}
                            last_name={card?.last_name}
                            organization={card?.organization}
                            job_title={card?.job_title}
                            phone={card?.phone}
                            email={card?.email}
                            banner_color={card?.banner_color}
                            links={card.links}
                            address={card?.address}
                            location={card?.location}
                            headline={card?.headline}
                            services={card?.services}
                            galleries={card?.galleries}
                        />
                    </ScrollArea>
                </div>

                <div className="col-span-2 flex flex-col justify-between rounded-lg border-2 p-4">
                    <Tabs defaultValue="share" className="w-full">
                        <TabsList className="flex h-16 w-full flex-row justify-between px-4">
                            <div className="space-x-4">
                                <TabsTrigger value="share" className="font-bold">
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
                                <Button variant="outline" className="cursor-pointer bg-green-600 hover:bg-green-800" onClick={() => EditCard()}>
                                    <Edit size={100} color="white" />

                                    <span className="text-white capitalize"> Edit</span>
                                </Button>
                            </div>
                        </TabsList>
                        <TabsContent value="share">
                            <Card>
                                {/* grid h-[100%] items-center justify-center gap-4 border-2 border-red-900 p-4 md:grid-cols-1 lg:grid-cols-2 */}
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 rounded-3xl border-none p-4 md:grid-cols-2">
                                        <div className="flex items-center justify-center rounded-lg border-2 p-4">
                                            <div className="h-full w-full rounded-3xl border-4 border-gray-500 p-4">
                                                <img src={`/storage/${card?.qr_code}`} alt="" className="h-full w-full object-cover" />
                                            </div>
                                        </div>

                                        <div className="flex h-full items-center justify-center rounded-lg border-2 p-4">
                                            <Button
                                                className="w-full cursor-pointer rounded-lg border-2 p-2 py-8"
                                                variant="outline"
                                                onClick={handleCopy}
                                            >
                                                {isCopied ? <Check size={100} className="text-green-500" /> : <Copy size={100} />}
                                                <span className="text-lg font-extrabold text-black capitalize">
                                                    {isCopied ? 'copied!' : 'copy link'}
                                                </span>
                                            </Button>
                                        </div>
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
                                        <Label htmlFor="personalized">Personalized Url</Label>
                                        <Input
                                            id="personalized"
                                            type="text"
                                            name="personalized_url"
                                            value={data.personalizedurl}
                                            onChange={(e) => setData('personalizedurl', e.target.value)}
                                        />
                                        <span className="text-normal text-sm">
                                            https://example.com/hi/{data.personalizedurl == '' ? card.url : data.personalizedurl}
                                        </span>
                                        <InputError message={errors.personalizedurl} className="mt-2" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between rounded-lg border-2 border-red-400 px-4 py-4">
                                        <div className="flex flex-col">
                                            <p className="font-extrabold">Delete</p>
                                            <p className="text-mute font-normal">Delete this card permanently.</p>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="cursor-pointer border-2 border-red-400 font-extrabold text-red-500 hover:text-red-700"
                                            onClick={() => deleteCard()}
                                        >
                                            Delete Card
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    {data.personalizedurl && (
                        <form
                            onSubmit={personalizedURL}
                            className="-mx-4 -mb-4 flex flex-row justify-end gap-4 rounded-none border-t-2 p-4 shadow-none"
                        >
                            <Button variant="destructive">Cancel</Button>
                            <Button variant="outline">Save</Button>
                        </form>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
