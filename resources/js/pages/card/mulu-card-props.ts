import type { DaySchedule, Gallery, Image, Service } from '@/types';

export const CARD_TEMPLATE_IDS = ['classic', 'modern', 'bold'] as const;
export type CardTemplateId = (typeof CARD_TEMPLATE_IDS)[number];

export type CardTemplateOption = {
    id: CardTemplateId;
    label: string;
    description?: string;
};

export const CARD_TEMPLATE_OPTIONS: CardTemplateOption[] = [
    {
        id: 'classic',
        label: 'Classic',
        description: 'Framed card with soft shadow, centered layout, and clear section dividers',
    },
    {
        id: 'modern',
        label: 'Modern',
        description: 'Compact header, left-aligned copy, and minimal chrome for fast scanning',
    },
    {
        id: 'bold',
        label: 'Bold',
        description: 'Cinematic hero with color wash, glass profile panel, editorial type, and outline actions',
    },
];

export type MuluCardProps = {
    url?: string;
    banner: Image;
    avatar: Image;
    logo: Image | null;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    headline: string;
    phone: string;
    email: string;
    banner_color: string;
    links: {
        name: string;
        url: string;
        placeholder: string;
    }[];
    address: string | null;
    location: string | null;
    galleries: Gallery[];
    services: Service[];
    business_hours: DaySchedule[] | null;
    business_hours_enabled: boolean;
};
