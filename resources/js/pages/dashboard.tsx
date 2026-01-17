import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Card as CardType, type SharedData } from '@/types';

import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle, CreditCard, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Reports = {
    active_cards: number;
    inactive_cards: number;
    total_cards: number;
};

type CardList = CardType[];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const permissions = auth.permissions;

    function showCardDetail(id: number) {
        router.get(route('card.show', { id: id }));
    }

    function showHelloCard(card:CardType){
        console.log("fucnk you")
        router.get(card.url)
    }

    function deleteCard(card: CardType) {
        if (confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
            router.get(route('card.delete', { id: card.id }), {
                onFinish: () => {
                    toast.success('Card has been deleted');
                },
                onSuccess: () => {
                    toast.success('Card has been deleted successfully');
                },
            });
        }
    }

    async function copyCardLink(card_url: string) {
        await navigator.clipboard.writeText(card_url);
    }

    function downloadQRCode(card: CardType) {
        const link = document.createElement('a');
        link.href = `/storage/${card?.qr_code}`;
        link.download = 'qr_code.png';
        link.click();
    }

    function editCard(id: number) {
        router.get(route('card.edit', { id: id }));
    }

    const { props } = usePage();
    const cards = props.cards as CardList;
    const reports = props.reports as Reports;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {reports.total_cards === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2">
                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2">
                        <h1 className="text-foreground text-xl font-bold capitalize">No cards found</h1>
                        <p className="text-muted-foreground">You have no cards. Create one now.</p>
                    </div>

                    <Link href="card/create">
                        <Button size="lg">
                            <span>Create New Card</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}

            {reports.total_cards > 0 && (
                <>
                    {permissions.card.create && (
                        <div className="flex flex-row justify-end p-2">
                            <Link href="card/create">
                                <Button size="lg">
                                    <span>Create New Card</span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:px-8">
                        <Card className="relative overflow-hidden border-0 bg-blue-50 dark:bg-blue-950">
                            <div className="absolute top-4 right-4 rounded-full bg-blue-600 p-3">
                                <CreditCard className="h-6 w-6 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Cards</h3>
                                <p className="mt-2 text-3xl font-bold text-blue-900 dark:text-blue-100">{reports.total_cards}</p>
                                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">All your digital cards</p>
                            </div>
                        </Card>

                        <Card className="relative overflow-hidden border-0 bg-green-50 dark:bg-green-950">
                            <div className="absolute top-4 right-4 rounded-full bg-green-600 p-3">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Active Cards</h3>
                                <p className="mt-2 text-3xl font-bold text-green-900 dark:text-green-100">{reports.active_cards}</p>
                                <p className="mt-1 text-xs text-green-600 dark:text-green-400">Currently live cards</p>
                            </div>
                        </Card>

                        <Card className="relative overflow-hidden border-0 bg-red-50 dark:bg-red-950">
                            <div className="absolute top-4 right-4 rounded-full bg-red-600 p-3">
                                <XCircle className="h-6 w-6 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-red-700 dark:text-red-300">Inactive Cards</h3>
                                <p className="mt-2 text-3xl font-bold text-red-900 dark:text-red-100">{reports.inactive_cards}</p>
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">Hidden or disabled cards</p>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cards.map((card, index) => (
                            <CardPreview
                                key={index}
                                banner={card.banner}
                                avatar={card.avatar}
                                logo={card.logo}
                                first_name={card.first_name}
                                last_name={card.last_name}
                                banner_color={card.banner_color}
                                onShowCardDetail={() => showCardDetail(card.id)}
                                onHelloCard={() => showHelloCard(card)}
                                onDelete={() => deleteCard(card)}
                                onCopyLink={() => copyCardLink(card.url)}
                                onDownloadQR={() => downloadQRCode(card)}
                                onEdit={() => editCard(card.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </AppLayout>
    );
}
