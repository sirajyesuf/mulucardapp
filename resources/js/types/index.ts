import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    activePlan: Subscription;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Card {
    id: number;
    url: string;
    banner: Image;
    cardname: string;
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string;
    phone: string;
    banner_color: string;
    links: {
        name: string;
        url: string;
        placeholder: string;
    }[];
    location: string;
    address: string;
    headline: string;
    galleries: Gallery[];
    services: Service[];
    business_hours: DaySchedule[];
    total_views?: number;
    total_saves?: number;
    qr_code:string;
    status: boolean;
}

export type DaySchedule = {
    id: string;
    day: string;
    isOpen: boolean;
    open: string;
    close: string;
};

export type Link = {
    name: string;
    url: string;
    placeholder: string;
};

export interface Image {
    file: File | null;
    path: string | null;
}

export interface Gallery {
    id: string;
    file: File | null;
    path: string | null;
    description: string;
}

export interface Service {
    id: string;
    file: File | string | null;
    path: string | null;
    name: string;
    description: string;
}

export interface Plan {
    id: number;
    name: string;
    price: number;
    type: string;
    number_of_vcard: number | 'unlimited';
    number_of_service: number | 'unlimited';
    number_of_nfc_business_card: number | 'unlimited';
    number_of_gallery: number | 'unlimited';
    description: string;
    features: string[];
}

export interface Order {
    order_number: string;
    status: string;
    payment_ref: string;
}

export type Bank = {
    id: number;
    name: string;
    account_holder: string;
    account_number: string;
    logo: string;
};

export interface Subscription {
    id: number;
    renewal_date: string;
    status: string;
    start_date: string;
    order: Order;
    plan: Plan;
}
