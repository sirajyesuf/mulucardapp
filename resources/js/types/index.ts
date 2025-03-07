import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
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
    [key: string]: unknown; // This allows for additional properties...
}

export interface Card {
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
}

type TimeSlot = {
    open: string;
    close: string;
};

type DaySchedule = {
    isOpen: boolean;
    timeSlots: TimeSlot[];
};

export type WeekSchedule = {
    [key: string]: DaySchedule;
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
