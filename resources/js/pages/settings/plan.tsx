import PlanCard from '@/components/plan-card';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type Plan, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

const DEFAULT_REDIRECTS = {
    billing: '/settings/billing/upgrade',
    register: '/register',
};

export default function Plan({ plans }: { plans: Plan[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <section id="pricing" className="bg-secondary/50 border-none p-4">
                    <div className="animate-fade-in mx-auto mb-16 text-center">
                        <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                            plans
                        </div>
                        <h2 className="text-3xl font-bold md:text-4xl">Simple, transparent pricing</h2>
                        <p className="text-muted-foreground mt-4 text-lg">Choose the perfect plan for your needs with no hidden fees.</p>
                    </div>

                    <div className="grid gap-8 border-none border-red-900 md:grid-cols-1 lg:grid-cols-3">
                        {[...plans]
                            .sort((a, b) => {
                                if (a.type === 'free' && b.type !== 'free') return -1;
                                if (b.type === 'free' && a.type !== 'free') return 1;
                                if (a.type === 'professional' && b.type === 'enterprise') return -1;
                                if (b.type === 'professional' && a.type === 'enterprise') return 1;
                                return 0;
                            })
                            .map((plan, index) => {
                                const isCurrentPlan = plan.id === auth.activePlan?.plan?.id;
                                const buttonText = isCurrentPlan
                                    ? 'Current Plan'
                                    : true // billing is always true in this context
                                      ? 'Upgrade Now'
                                      : plan.type === 'enterprise'
                                        ? 'Contact Sales'
                                        : 'Get Started';
                                const buttonRedirect = route('checkout', { plan: plan });

                                return (
                                    <PlanCard
                                        key={index}
                                        plan={plan}
                                        buttonText={buttonText}
                                        buttonRedirect={buttonRedirect}
                                        isButtonDisabled={isCurrentPlan}
                                    />
                                );
                            })}
                    </div>
                </section>
            </SettingsLayout>
        </AppLayout>
    );
}
