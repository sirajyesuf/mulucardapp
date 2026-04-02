import type { MuluCardProps } from '@/pages/card/mulu-card-props';

/** Stable demo data for marketing / previews (landing page, etc.). */
export const DEMO_MULU_CARD_PROPS: MuluCardProps = {
    url: 'https://mulucard.example/demo',
    banner: {
        file: null,
        path: 'https://picsum.photos/seed/mulucard-banner/1200/400',
    },
    avatar: {
        file: null,
        path: 'https://picsum.photos/seed/mulucard-avatar/256/256',
    },
    logo: {
        file: null,
        path: 'https://picsum.photos/seed/mulucard-logo/128/128',
    },
    first_name: 'Avery',
    last_name: 'Chen',
    organization: 'Northwind Studio',
    job_title: 'Product Designer',
    headline: 'Helping teams ship interfaces that feel intentional, fast, and human.',
    phone: '+1 (555) 010-4291',
    email: 'avery.chen@example.com',
    banner_color: '#3a59ae',
    links: [
        {
            name: 'linkedin',
            url: 'https://linkedin.com/in/example',
            placeholder: 'https://linkedin.com/in/your-profile',
        },
        {
            name: 'twitter',
            url: 'https://x.com/example',
            placeholder: 'https://x.com/your-profile',
        },
        {
            name: 'website',
            url: 'https://example.com',
            placeholder: 'https://your-site.com',
        },
    ],
    address: '1200 Market Street, Suite 400',
    location: 'San Francisco, CA',
    galleries: [
        {
            id: 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f708',
            file: null,
            path: 'https://picsum.photos/seed/mulucard-gallery1/640/400',
            description: 'Recent client dashboard work',
        },
    ],
    services: [
        {
            id: 'b2c3d4e5-f6a7-4890-b123-c4d5e6f70891',
            file: null,
            path: 'https://picsum.photos/seed/mulucard-service1/400/300',
            name: 'UX & UI audits',
            description: 'A focused review of your flows with actionable next steps.',
        },
    ],
    business_hours_enabled: true,
    business_hours: [
        { id: '11111111-1111-4111-a111-111111111111', day: 'Monday', isOpen: true, open: '09:00', close: '17:00' },
        { id: '22222222-2222-4222-a222-222222222222', day: 'Tuesday', isOpen: true, open: '09:00', close: '17:00' },
        { id: '33333333-3333-4333-a333-333333333333', day: 'Wednesday', isOpen: true, open: '09:00', close: '17:00' },
        { id: '44444444-4444-4444-a444-444444444444', day: 'Thursday', isOpen: true, open: '09:00', close: '17:00' },
        { id: '55555555-5555-4555-a555-555555555555', day: 'Friday', isOpen: true, open: '09:00', close: '16:00' },
        { id: '66666666-6666-4666-a666-666666666666', day: 'Saturday', isOpen: false, open: '10:00', close: '14:00' },
        { id: '77777777-7777-4777-a777-777777777777', day: 'Sunday', isOpen: false, open: '10:00', close: '14:00' },
    ],
};
