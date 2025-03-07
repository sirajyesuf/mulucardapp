import { type Card } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import MuluCard from './card/card';

export default function Hello() {
    const { props } = usePage();
    const card = props.card as Card;
    console.log(card);
    return (
        <>
            <Head title="mulucard" />
            <div className="flex min-h-svh flex-col justify-between gap-4 bg-white p-1">
                <div className="mx-auto mt-0 mb-10 w-[500px] rounded-lg border-4 p-1">
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
