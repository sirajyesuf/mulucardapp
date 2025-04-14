import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
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
    { title: 'Show Card', href: '' },
];

export default function ShowCard() {
    const [isCopied, setIsCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('share');

    const { props } = usePage();
    const card = props.card as CardType;
    console.log(card)

    const { data, setData, post, errors, reset } = useForm({
        personalizedurl: card.url.split('/').pop(),
        cardname: card.cardname,
        status: card.status,
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

    const settings = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if any field has been modified
        const hasChanges = [
            data.personalizedurl !== card.url,
            data.cardname !== card.cardname,
            data.status !== card.status
        ].some(Boolean);

        if (!hasChanges) {
            toast.info('No changes to save');
            return;
        }

        post(route('card.settings', { id: card.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Card updated successfully');
            
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Failed to update card settings');
                console.error('Update errors:', errors);
            },
        });
    };

    const deleteCard = () => {
        post(route('card.delete', { id: card.id }), {
            onFinish: () => {
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
            const linkToCopy = card.url
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
                            business_hours={card.business_hours}
                            banner={card?.banner}
                        />
                    </ScrollArea>
                </div>

                <div className="col-span-2 flex flex-col justify-between rounded-lg border-none p-4">
                    <Tabs defaultValue="share" className="w-full" onValueChange={(value) => setActiveTab(value)}>
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
                                {activeTab === 'share' && (
                                    <Button variant="outline" className="cursor-pointer" onClick={() => DownloadQRCode()}>
                                        <Download size={100} />
                                    </Button>
                                )}

                                <Button variant="outline" className="cursor-pointer bg-green-600 hover:bg-green-800" onClick={() => EditCard()}>
                                    <Edit size={100} color="white" />

                                    <span className="text-white capitalize"> Edit</span>
                                </Button>
                            </div>
                        </TabsList>
                        <TabsContent value="share" className="border-none">
                            <Card className="shadow-none">
                                <div className="grid grid-cols-1 gap-4 rounded-sm border-none p-2 md:grid-cols-2">
                                    <Card className="flex flex-col items-center justify-center shadow-none">
                                        <h1 className="text-xl font-bold capitalize">TOTAL VIEWS</h1>
                                        <p className="text-2xl font-extrabold">{card.total_views}</p>
                                    </Card>

                                    <Card className="flex flex-col items-center justify-center shadow-none">
                                        <h1 className="text-xl font-bold capitalize">TOTAL SAVES</h1>
                                        <p className="text-xl font-extrabold">{card.total_saves}</p>
                                    </Card>
                                </div>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 rounded-3xl border-none p-4 md:grid-cols-2">
                                        <div className="flex items-center justify-center rounded-lg border-2 p-4">
                                            <div className="h-full w-full rounded-3xl border-4 border-gray-500 p-4">
                                                <img src={`/storage/${card?.qr_code}`} alt="" className="h-full w-full object-cover" />
                                            </div>
                                        </div>

                                        <div className="flex h-full items-center justify-center rounded-lg border-2 p-4">
                                            <Button
                                                className="w-full cursor-pointer rounded-xl border-4 p-2 py-8"
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
                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle>Settings</CardTitle>
                                    <CardDescription>Edit the details of this card.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-2 rounded-lg border-2 border-dashed border-gray-400 p-4">
                                        <Label htmlFor="personalized">Personalized URL</Label>
                                        <Input
                                            id="personalized"
                                            type="text"
                                            name="personalized_url"
                                            value={data.personalizedurl}
                                            onChange = { (e) => setData('personalizedurl', e.target.value)}
                                        />
                                        <span className="text-normal text-sm">
                                            {route('card.hello', { url: data.personalizedurl == '' ? card.url : data.personalizedurl })}
                                        </span>
                                        <InputError message={errors.personalizedurl} className="mt-2" />
                                    </div>

                                    <div className="space-y-2 rounded-lg border-2 border-dashed border-gray-400 p-4">
                                        <Label htmlFor="cardname">Card Name</Label>
                                        <Input
                                            id="cardname"
                                            type="text"
                                            name="cardname"
                                            value={data.cardname}
                                            onChange = { (e) => setData('cardname', e.target.value)}
                                        />
                                        <InputError message={errors.cardname} className="mt-2" />
                                    </div>

                                    <div className="space-y-2 rounded-lg border-2 border-gray-400 p-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="airplane-mode"
                                                className={`${data.status ? 'bg-green-500' : 'bg-red-500'} hover:bg-green-400 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500`}
                                                checked={data.status}
                                                onCheckedChange={ (v) => setData('status', v)}
                                            />
                                            <Label htmlFor="airplane-mode" className={data.status ? 'text-green-700' : 'text-red-700'}>
                                                {data.status ? 'Card is active and visible' : 'Card is currently disabled'}
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-between rounded-lg border-2 border-red-400 bg-red-50 px-4 py-4">
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
                    {activeTab === 'settings' && (
                        <form
                            onSubmit={settings}
                            className="-mx-4 mt-2 -mb-4 flex flex-row justify-end rounded-xl border-2 bg-gray-50 p-2 shadow-none"
                        >
                            <Button variant="outline" className="border-green-400 bg-green-400 hover:border-green-600 hover:bg-green-600">
                                Save
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
