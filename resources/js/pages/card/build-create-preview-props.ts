import { DEMO_MULU_CARD_PROPS } from '@/data/demo-mulu-card-props';
import type { MuluCardProps } from '@/pages/card/mulu-card-props';
import type { DaySchedule, Gallery, Image, Link, Service } from '@/types';

/** Subset of create form fields needed to build the live preview. */
export type CreatePreviewFormInput = {
    banner: Image;
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string;
    phone: string;
    banner_color: string;
    links: Link[];
    location: string;
    address: string;
    headline: string;
    business_hours: DaySchedule[];
    business_hours_enabled: boolean;
    url?: string;
};

const demo = DEMO_MULU_CARD_PROPS;

function pickText(user: string, fallback: string): string {
    return user.trim() !== '' ? user : fallback;
}

function pickImage(user: Image, fallback: Image): Image {
    if (user.path || user.file) {
        return user;
    }
    return fallback;
}

function pickLogo(user: Image, fallback: Image | null): Image | null {
    if (user.path || user.file) {
        return user;
    }
    return fallback;
}

function pickNullableText(user: string, fallback: string | null): string | null {
    if (user.trim() !== '') {
        return user;
    }
    return fallback;
}

/**
 * Merge create form state with demo card props so the template preview is never empty.
 * Does not mutate the form; for display only.
 */
export function buildCreatePreviewProps(
    form: CreatePreviewFormInput,
    validGalleries: Gallery[],
    validServices: Service[],
): MuluCardProps {
    const url = typeof form.url === 'string' && form.url.trim() !== '' ? form.url : demo.url;

    return {
        url,
        banner: pickImage(form.banner, demo.banner),
        avatar: pickImage(form.avatar, demo.avatar),
        logo: pickLogo(form.logo, demo.logo),
        first_name: pickText(form.first_name, demo.first_name),
        last_name: pickText(form.last_name, demo.last_name),
        organization: pickText(form.organization, demo.organization),
        job_title: pickText(form.job_title, demo.job_title),
        headline: pickText(form.headline, demo.headline),
        phone: pickText(form.phone, demo.phone),
        email: pickText(form.email, demo.email),
        banner_color: form.banner_color,
        links: form.links.length > 0 ? form.links : demo.links,
        address: pickNullableText(form.address, demo.address),
        location: pickNullableText(form.location, demo.location),
        galleries: validGalleries.length > 0 ? validGalleries : demo.galleries,
        services: validServices.length > 0 ? validServices : demo.services,
        business_hours_enabled: form.business_hours_enabled,
        business_hours: form.business_hours,
    };
}
