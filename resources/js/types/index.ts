import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    activePlan: Subscription;
    unReadNotifications: Notification[];
    permissions: {
        card: {
            create: boolean;
        };
    };
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
    cardSocialLinks: string[];
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
    location: string | null;
    address: string | null;
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
    description: string;
    features: string[];
    price: number;
    number_of_digital_business_card: number | null;
    number_of_nfc_business_card: number | null;
    number_of_gallery: number | null;
    number_of_service: number | null;
    most_popular: boolean;
    deleted_at?: string | null;
    created_at: string;
    updated_at: string;
    button_text: string;
    redirect_url: string;
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


export interface Notification {
    id: string; // UUID
    type: string; // Fully qualified class name, e.g. "App\\Notifications\\OrderCreatedNotification"
    notifiable_type: string; // Usually "App\\Models\\User"
    notifiable_id: string | number; // Could be either depending on your user ID type
    data: {
      [key: string]: any; // You can strongly type this based on your actual notification structure below
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
}
