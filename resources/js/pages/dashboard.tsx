import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type DaySchedule, type Gallery, type Image, type Service, type SharedData,type Card as CardType } from '@/types';

import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import MuluCard from './card/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Type for individual social link
// interface SocialLink {
//     id: number;
//     name: string;
//     url: string;
//     card_id: number;
//     created_at: string; // ISO 8601 date string
//     updated_at: string; // ISO 8601 date string
// }

// interface Card {
//     id: number;
//     url: string;
//     banner: Image;
//     avatar: Image;
//     logo: Image;
//     user_id: number;
//     first_name: string;
//     last_name: string;
//     organization: string;
//     job_title: string;
//     email: string | null;
//     phone: string | null;
//     banner_color: string | null;
//     created_at: string;
//     updated_at: string;
//     social_links: SocialLink[];
//     headline: string;
//     services: Service[];
//     galleries: Gallery[];
//     address: string;
//     location: string;
//     business_hours: DaySchedule[];
// }

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
        console.log('show card detail', id);
        router.get(route('card.show', { id: id }));
    }

    const { props } = usePage();
    const cards = props.cards as CardList;
    const reports = props.reports as Reports;
    console.log(reports);
    console.log(permissions);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            

            {reports.total_cards === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2">
                
            
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2">
                    <h1 className="text-xl font-bold text-foreground capitalize">No cards found</h1>
                    <p className="text-gray-500">You have no cards. Create one now.</p>
                </div>

                <Link
                    className="flex flex-row items-center justify-center gap-4 rounded-lg p-0 text-black shadow-none hover:bg-gray-100"
                    href="card/create"
                >
                    <Button size="lg" className="group transition-colors">
                        <span>Create New Card</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
            )}


            {reports.total_cards > 0 && (
            <>
            {permissions.card.create && (
                <div className="flex flex-row justify-end rounded-xl border-none p-2">
                    <Link
                        className="flex flex-row items-center justify-center gap-4 rounded-lg bg-gray-50 p-0 text-black shadow-none hover:bg-gray-100"
                        href="card/create"
                    >
                        <Button size="lg" className="group transition-colors">
                            <span>Create New Card</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-3 gap-2 rounded-2 border-none p-1 md:px-8 md:grid-cols-3">
                <Card className="flex flex-col items-center justify-center border-2 shadow-2">
                    <h1 className="text-sm font-bold  text-center">Number of Cards</h1>
                    <p className="text-4xl font-extrabold">{reports.total_cards}</p>
                </Card>

                <Card className="flex flex-col items-center justify-center border-2 shadow-2">
                    <h1 className="text-sm font-bold  text-center">Number of Active Cards</h1>
                    <p className="text-4xl font-extrabold">{reports.active_cards}</p>
                </Card>

                <Card className="flex flex-col items-center justify-center border-2 shadow-2">
                    <h1 className="text-sm font-bold  text-center">Number of Inactive Cards</h1>
                    <p className="text-4xl font-extrabold">{reports.inactive_cards}</p>
                </Card>
            </div>


            <div className="min-h-screen  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 rounded-xl border-none p-4">
                {cards.map((card, index) => (
                    <ScrollArea className="h-[600px] w-full cursor-pointer rounded-md border-none md:w-[500px]">
                        <div className="cursor-pointer" key={index} onClick={() => showCardDetail(card.id)}>
                            <MuluCard
                                url={card.url}
                                banner={card.banner}
                                avatar={card.avatar}
                                logo={card.logo}
                                first_name={card.first_name}
                                last_name={card.last_name}
                                organization={card.organization}
                                job_title={card.job_title}
                                email={card.email}
                                phone={card.phone}
                                banner_color={card.banner_color}
                                links={card.links}
                                headline={card.headline}
                                services={card.services}
                                galleries={card.galleries}
                                address={card.address}
                                location={card.location}
                                business_hours={card.business_hours}
                            />
                        </div>
                    </ScrollArea>
                ))}
            </div>
            </>
            )}
        


        </AppLayout>
    );
}
