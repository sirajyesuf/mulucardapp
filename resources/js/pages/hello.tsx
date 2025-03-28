import { type Card } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Contact } from 'lucide-react';
import MuluCard from './card/card';
export default function Hello() {
    const { props } = usePage();
    const card = props.card as Card;
    console.log(card);

    function downloadVCard() {
        // const url = route('card.vcard', { id: card.id });
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'contact.vcf';
        // link.click();

        const url = route('card.vcard', { id: card.id });

        // Check if the user is on mobile
        if (/android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
            window.location.href = url; // Opens the vCard file in contacts app
        } else {
            // For desktop, proceed with download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${card.first_name}_${card.last_name}.vcf`;
            link.click();
        }
    }
    return (
        <>
            <Head title="mulucard" />
            <div className="flex min-h-svh flex-col justify-between gap-4 bg-white p-1">
                <div className="mx-auto mt-0 mb-10 rounded-lg border-4 p-1 md:w-[500px]">
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
                </div>

                <div className="items-top fixed bottom-0 -mb-8 flex h-16 w-xl justify-center self-center rounded-4xl border-none bg-[#9f77e3] pt-2 text-white">
                    a free digital business card from MuluCard
                </div>
            </div>
            <div className="fixed bottom-0 h-24 w-full border-none px-8">
                <div className="flex w-full flex-row justify-between p-2">
                    <div>something will be here too</div>
                    <div
                        className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500"
                        onClick={() => downloadVCard()}
                    >
                        <Contact size={50} color="white" />
                    </div>
                </div>
            </div>
        </>
    );
}
