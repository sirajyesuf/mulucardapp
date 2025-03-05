import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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

// Type for the card object
interface Card {
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
}

// Type for the array of cards
type CardList = Card[];
export default function Dashboard() {
    const { props } = usePage();
    function showCardDetail(url: string) {
        router.get(route('card.show', { url: url }));
    }
    const cards = props.cards as CardList | undefined; // Type assertion with fallback
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
            <div className="grid h-full flex-1 grid-cols-1 items-center justify-center gap-2 rounded-xl p-4 md:grid-cols-2">
                {cards?.map((card, index) => (
                    <div className="w-full cursor-pointer border-2 md:w-[500px]" key={index} onClick={() => showCardDetail(card.url)}>
                        <MuluCard
                            previewUrl={card.avatar}
                            previewLogo={card.logo}
                            first_name={card.first_name}
                            last_name={card.last_name}
                            organization={card.organization}
                            job_title={card.job_title}
                            email={card.email}
                            phone={card.phone}
                            banner_color={card.banner_color}
                            links={card.social_links}
                            headline={card.headline}
                            business_hours={card.business_hours}
                        />
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
