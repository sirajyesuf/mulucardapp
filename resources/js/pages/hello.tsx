import { type Card } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Contact, Share2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import ShareButton from '@/components/share-button';
import MuluCard from './card/card';
import { Button } from '@/components/ui/button';

export default function Hello() {

    const { props } = usePage();
    const card = props.card as Card;
    console.log(card)

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
        
            lines.push(`PHOTO;VALUE=URI:${cardData.avatar.path}`);
        }

        // Logo URL (using the path property)
        // vCard standard: LOGO;VALUE=URI:<url>
        if (cardData.logo && cardData.logo.path) {
            lines.push(`LOGO;VALUE=URI:${cardData.logo.path}`);
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

    // Ensure card data exists before accessing properties
    const pageTitle = card?.first_name && card?.last_name
        ? `${card.first_name} ${card.last_name} | MuluCard`
        : 'MuluCard';

    const description = card ? `${card.job_title} at ${card.organization}` : 'MuluCard';
    const ogtitle = card ? `${card.first_name} ${card.last_name}` : 'MuluCard';
    const ogdescription = card ? description : 'MuluCard';
    const ogimage = card?.avatar?.path ?? 'MuluCard'; 
    const ogurl = card ? card.url : 'MuluCard';  
    const twitterTitle = card ? `${card.first_name} ${card.last_name}` : 'MuluCard';  
    const twitterDescription = card ? description : 'MuluCard';  
    const twitterImage = card?.avatar?.path ?? 'MuluCard';  
    const twitterUrl = card ? card.url : 'MuluCard';   

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={ogtitle} />
                <meta property="og:description" content={ogdescription} />
                <meta property="og:image" content={ogimage} />
                <meta property="og:url" content={ogurl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="MuluCard" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@MuluCard" />
                <meta name="twitter:title" content={twitterTitle} />
                <meta name="twitter:description" content={twitterDescription} />
                <meta name="twitter:image" content={twitterImage} />
                <meta name="twitter:url" content={twitterUrl} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href={ogurl} />
            </Head>
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
                    <div className="">
                        <ShareButton
                            title="Check out this awesome content!"
                            description="I found this really interesting article that I thought you might enjoy."
                        />

                    </div>
                    <Button variant="outline" size="sm" onClick={() => downloadVCard()} >
                    <Contact className="h-4 w-4" />
                    Add To Contact
                    </Button>
                </div>
            </div>
        </>
    );
}
