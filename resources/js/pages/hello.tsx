import { type Card } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Contact, Share2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import SocialShare from '@/components/social-share';
import MuluCard from './card/card';
export default function Hello() {

    const { props } = usePage();
    const card = props.card as Card;
    const [showSocialShare, setShowSocialShare] = useState(false);

    // Function to generate vCard content string based on Card type
    function generateVCardContent(cardData: Card): string {
        const lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            // Name (Required)
            `FN:${cardData.first_name} ${cardData.last_name}`, // Formatted Name
            `N:${cardData.last_name};${cardData.first_name};;;`, // Name components: Last;First;Middle;Prefix;Suffix
        ];

        // Organization and Title
        if (cardData.organization) lines.push(`ORG:${cardData.organization}`);
        if (cardData.job_title) lines.push(`TITLE:${cardData.job_title}`);

        // Phone Number
        if (cardData.phone) lines.push(`TEL;TYPE=CELL:${cardData.phone}`); // Assuming mobile/cell

        // Email
        if (cardData.email) lines.push(`EMAIL:${cardData.email}`);

        // Address (Combining address and location)
        let fullAddress = '';
        if (cardData.address) fullAddress += cardData.address;
        if (cardData.location) fullAddress += (fullAddress ? ', ' : '') + cardData.location;
        if (fullAddress) {
            lines.push(`ADR;TYPE=WORK:;;${fullAddress.replace(/,/g, '\\,').replace(/\n/g, '\\n')};;;;`); // Escape commas and newlines
        }

        // Website URL (Using the first link or the card URL)
        if (cardData.links && cardData.links.length > 0 && cardData.links[0].url) {
            lines.push(`URL:${cardData.links[0].url}`);
        } else if (cardData.url) {
            lines.push(`URL:${cardData.url}`); // Fallback to the card's main URL
        }
        // Add other links as separate URL entries if needed, potentially with types
        // cardData.links?.slice(1).forEach(link => {
        //    if (link.url) lines.push(`URL:${link.url}`);
        // });


        // Headline as Note
        if (cardData.headline) lines.push(`NOTE:${cardData.headline.replace(/\n/g, '\\n')}`); // Escape newlines

        // Avatar URL (using the path property)
        // vCard standard: PHOTO;VALUE=URI:<url>
        if (cardData.avatar && cardData.avatar.path) {
        
            lines.push(`PHOTO;VALUE=URI:${import.meta.env.VITE_APP_URL}${cardData.avatar.path}`);
        }

        // Logo URL (using the path property)
        // vCard standard: LOGO;VALUE=URI:<url>
        if (cardData.logo && cardData.logo.path) {
            lines.push(`LOGO;VALUE=URI:${import.meta.env.VITE_APP_URL}${cardData.logo.path}`);
        }

        // Business Hours - Add to NOTE field (optional, as no standard vCard field exists)
        // let bizHoursNote = cardData.business_hours
        //     ?.map(bh => `${bh.day}: ${bh.isOpen ? `${bh.open} - ${bh.close}` : 'Closed'}`)
        //     .join('\\n'); // Use escaped newline for vCard NOTE
        // if (bizHoursNote) {
        //    lines.push(`NOTE;X-BUSINESS-HOURS:${bizHoursNote}`); // Could add to existing NOTE or use custom X- field
        // }


        lines.push('END:VCARD');
        return lines.join('\r\n'); // Use CRLF line endings
    }

    function downloadVCard() {
        const vCardString = generateVCardContent(card);

        // Make request to increment view count
        axios.post(route('card.updatetotalsaves', {id:card.id}))
        .catch(error => {
                console.error('Error updating view count:', error);
        });

        // Create a Blob with the vCard content
        const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const filename = `${card.first_name}_${card.last_name}.vcf`;

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }


    return (
        <>
            <Head title="mulucard" />
            <div className="flex min-h-svh flex-col justify-between gap-4 bg-white p-1">
                <div className="mx-auto mt-0 mb-24 md:mb-10 rounded-lg md:border-4 border-none p-1 md:w-[500px]">
                    <MuluCard
                        url={card?.url}
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
                        business_hours={card?.business_hours}
                        banner={card?.banner}
                    />
                </div>
                <div className="items-top fixed bottom-0 -mb-8 flex h-16 w-xl justify-center self-center rounded-4xl border-none bg-[#9f77e3] pt-2 text-white">
                    a free digital business card from MuluCard
                </div>
            </div>
            <div className="fixed bottom-0 h-24  w-full border-none p-0">
                <div className="flex w-full flex-row justify-between p-2">
                    <div className="relative">
                        <SocialShare
                            isOpen={showSocialShare}
                            onClose={() => setShowSocialShare(false)}
                            url={window.location.href}
                            title={`${card.first_name} ${card.last_name}'s Digital Card`}
                        />
                        <div
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500"
                            onClick={() => setShowSocialShare(!showSocialShare)}
                        >
                            <Share2 size={30} color="white" />
                        </div>
                    </div>
                    <div
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500"
                        onClick={() => downloadVCard()}
                    >
                        <Contact size={30} color="white" />
                    </div>
                </div>
            </div>
        </>
    );
}
