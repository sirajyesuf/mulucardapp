import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

import { EnterprisePlan, FreePlan, MostPopular } from '@/components/plans';
import { type Plan } from '@/types';

export default function Plan({ plans }: { plans: Plan[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <section id="pricing" className="bg-secondary/50 p-20">
                    {/* <div className="container mx-auto max-w-7xl px-4"> */}
                    <div className="animate-fade-in mx-auto mb-16 text-center">
                        <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                            Pricing plans
                        </div>
                        <h2 className="text-3xl font-bold md:text-4xl">Simple, transparent pricing</h2>
                        <p className="text-muted-foreground mt-4 text-lg">Choose the perfect plan for your needs with no hidden fees.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 border-2 border-red-900 md:grid-cols-3">
                        {[...plans]
                            .sort((a, b) => {
                                if (a.type === 'free' && b.type !== 'free') return -1;
                                if (b.type === 'free' && a.type !== 'free') return 1;
                                if (a.type === 'professional' && b.type === 'enterprise') return -1;
                                if (b.type === 'professional' && a.type === 'enterprise') return 1;
                                return 0;
                            })
                            .map((plan, index) => (
                                <div key={index}>
                                    {plan.type === 'free' ? (
                                        <FreePlan plan={plan} billing={true} />
                                    ) : plan.type === 'professional' ? (
                                        <MostPopular plan={plan} billing={true} />
                                    ) : plan.type === 'enterprise' ? (
                                        <EnterprisePlan plan={plan} />
                                    ) : null}
                                </div>
                            ))}
                    </div>
                    {/* </div> */}
                </section>
            </SettingsLayout>
        </AppLayout>
    );
}
