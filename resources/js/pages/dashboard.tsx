import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Gallery, type Image, type Service } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
}

type CardList = Card[];

export default function Dashboard() {
    function showCardDetail(url: string) {
        router.get(route('card.show', { url: url }));
    }
    const { props } = usePage();
    const cards = props.cards as CardList;
    console.log(cards);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-row justify-end rounded-xl border-none p-2">
                <Link
                    className="hover:bg- flex flex-row items-center justify-center gap-4 rounded-lg bg-gray-500 px-4 py-2 text-white shadow-none hover:bg-gray-700"
                    href="card/create"
                >
                    <Plus width={30} height={30} />
                    <span className="text-md font-bold capitalize">new card</span>
                </Link>
            </div>
            <div className="flex h-full flex-1 flex-row flex-wrap items-center justify-center gap-2 rounded-xl border-2 p-2">
                {cards.map((card, index) => (
                    <ScrollArea className="h-[600px] w-full cursor-pointer rounded-md border-none md:w-[400px]">
                        <div className="" key={index} onClick={() => showCardDetail(card.url)}>
                            <MuluCard
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
                            />
                        </div>
                    </ScrollArea>
                ))}
            </div>
        </AppLayout>
    );
}
