import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type DaySchedule, type Gallery, type Image, type Service } from '@/types';

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
interface SocialLink {
    id: number;
    name: string;
    url: string;
    card_id: number;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

interface Card {
    id: number;
    url: string;
    banner: Image;
    avatar: Image;
    logo: Image;
    user_id: number;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string | null;
    phone: string | null;
    banner_color: string | null;
    created_at: string;
    updated_at: string;
    social_links: SocialLink[];
    headline: string;
    services: Service[];
    galleries: Gallery[];
    address: string;
    location: string;
    business_hours: DaySchedule[];
}

type Reports = {
    active_cards: number;
    inactive_cards: number;
    total_cards: number;
}

type CardList = Card[];

export default function Dashboard() {
    function showCardDetail(url: string) {
        router.get(route('card.show', { url: url }));
    }

    const { props } = usePage();
    const cards = props.cards as CardList;
    const reports = props.reports as Reports;
    console.log(reports);

    // active_cards: 50;
    // inactive_cards: 50;
    // total_cards;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-row justify-end rounded-xl border-none p-2">
                <Link
                    className="flex flex-row items-center justify-center gap-4 rounded-lg bg-gray-50 p-0 text-black shadow-none hover:bg-gray-100"
                    href="card/create"
                >
                    <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark group transition-colors">
                        <span>Create New Card</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-sm border-none p-2 md:grid-cols-3">
                <Card className="flex flex-col items-center justify-center border-none bg-[#9b87f5] text-[#e8f1fa] shadow-none">
                    <h1 className="text-xl font-bold capitalize">Number of cards</h1>
                    <p className="text-2xl font-extrabold">{reports.total_cards}</p>
                </Card>

                <Card className="flex flex-col items-center justify-center border-none bg-[#9b87f5] text-[#e8f1fa] shadow-none">
                    <h1 className="text-xl font-bold capitalize">Number of active cards</h1>
                    <p className="text-xl font-extrabold">{reports.active_cards}</p>
                </Card>

                <Card className="flex flex-col items-center justify-center border-none bg-[#9b87f5] text-[#e8f1fa] shadow-none">
                    <h1 className="text-xl font-bold capitalize">Number of inactive cards</h1>
                    <p className="text-2xl font-extrabold">{reports.inactive_cards}</p>
                </Card>
            </div>
            <div className="flex min-h-screen flex-row flex-wrap items-start justify-start gap-2 rounded-xl border-none p-4">
                {cards.map((card, index) => (
                    <ScrollArea className="h-[500px] w-full cursor-pointer rounded-md border-none md:w-[400px]">
                        <div className="" key={index} onClick={() => showCardDetail(card.url)}>
                            <MuluCard
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
        </AppLayout>
    );
}
