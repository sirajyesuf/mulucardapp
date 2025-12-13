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
                <section id="pricing" className="">
                    <div className="animate-fade-in mx-auto mb-16 text-center">
                        <div className="text-foreground mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                            plans
                        </div>
                        <h2 className="text-3xl text-foreground font-bold md:text-4xl">Simple, transparent pricing</h2>
                        <p className="text-foreground mt-4 text-lg">Choose the perfect plan for your needs with no hidden fees.</p>
                    </div>

                    <div className="grid gap-8 border-none border-red-900 lg:grid-cols-1 xl:grid-cols-3">
                        {[...plans]
                            .sort((a, b) => {
                                return 0;
                            })
                            .map((plan, index) => {
                                const isCurrentPlan = plan.id === auth.activePlan?.plan?.id;
                            

                                return (
                                    <PlanCard
                                        key={index}
                                        plan={plan}
                                        isButtonDisabled={isCurrentPlan}
                                        billing={true}
                                    />
                                );
                            })}
                    </div>
                </section>
            </SettingsLayout>
        </AppLayout>
    );
}
