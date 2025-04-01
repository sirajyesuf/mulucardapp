import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type Subscription } from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertCircle, Check } from 'lucide-react';
import { useState } from 'react';

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
    console.log('hey', subscription);

    const statusColors = {
        active: 'text-green-500',
        canceled: 'text-gray-500',
        expired: 'text-gray-500',
        failed: 'text-red-500',
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('etb', {
            style: 'currency',
            currency: 'ETB',
        }).format(amount);
    };

    return (
        <Card
            className="animate-fade-up overflow-hidden border-gray-200 bg-white/90 p-6 shadow-none backdrop-blur-sm transition-all duration-300 hover:bg-white/95"
            style={{
                animationDelay: '0.1s',
            }}
        >
            <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-medium">{subscription.plan.name}</h3>
                        <p className="text-muted-foreground text-sm">Annual Subscription</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{formatCurrency(subscription.plan.price)}</p>
                        <p className="text-muted-foreground text-sm">Billed on {new Date(subscription.start_date).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-between space-y-2 pt-2 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="flex items-center">
                        <span className={cn('flex items-center text-sm font-medium', statusColors[subscription.status as keyof typeof statusColors])}>
                            {subscription.status === 'active' ? (
                                <Check className="mr-1 h-4 w-4" />
                            ) : subscription.status === 'failed' ? (
                                <AlertCircle className="mr-1 h-4 w-4" />
                            ) : null}
                            <span className="capitalize">{subscription.status}</span>
                        </span>
                        {/* {subscription.renewal_date && subscription.status === 'active' && (
                            <span className="text-muted-foreground ml-4 text-sm">
                                Next billing: {new Date(subscription.renewal_date).toLocaleDateString()}
                            </span>
                        )} */}
                    </div>
                    {/* <div className="text-muted-foreground text-sm">bank transfer</div> */}
                </div>
            </div>
        </Card>
    );
};

type FilterStatus = 'all' | 'active' | 'expired';

export default function Subscription33({ subscriptions }: { subscriptions: Subscription[] }) {
    console.log('subscriptions', subscriptions);
    const [filter, setFilter] = useState<FilterStatus>('all');

    const filteredSubscriptions = filter === 'all' ? subscriptions : subscriptions.filter((sub) => sub.status === filter);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="w-full max-w-4xl">
                    <div className="mb-6 flex flex-wrap gap-2">
                        {(['all', 'active', 'expired'] as const).map((status, index) => (
                            <Button
                                key={status}
                                variant={filter === status ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter(status)}
                                className={cn('capitalize', filter === status ? '' : 'bg-white/50 hover:bg-white/80', 'animate-fade-in')}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {status}
                            </Button>
                        ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                        {filteredSubscriptions.length > 0 ? (
                            filteredSubscriptions.map((subscription: Subscription, index) => (
                                <SubscriptionCard key={index} subscription={subscription} />
                            ))
                        ) : (
                            <div className="animate-fade-in py-16 text-center">
                                <h3 className="mb-2 text-lg font-medium">No subscriptions found</h3>
                                <p className="text-muted-foreground">
                                    You don't have any {filter !== 'all' ? filter : ''} subscriptions at the moment.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
