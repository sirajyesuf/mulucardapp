import { Gallery, Service, SocialLink } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import MuluCard from './card/card';

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
    galleries: Gallery[];
    services: Service[];
};

export default function ResetPassword() {
    const { props } = usePage();
    const card = props.card as Card | undefined;
    console.log(card);
    return (
        <>
            <Head title="mulucard" />
            <div className="flex min-h-svh flex-col justify-between gap-4 bg-white p-1">
                <div className="mx-auto mt-0 mb-10 w-[500px] rounded-lg border-4 p-1">
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
                        links={card.social_links}
                        address={card?.address}
                        location={card?.location}
                        headline={card?.headline}
                        services={card?.services}
                        galleries={card?.galleries}
                    />
                </div>

                <div className="items-top fixed bottom-0 -mb-8 flex h-16 w-xl justify-center self-center rounded-4xl border-none bg-[#9f77e3] pt-2 text-white">
                    a free digital business card from MuluCard
                </div>
            </div>
        </>
    );
}
