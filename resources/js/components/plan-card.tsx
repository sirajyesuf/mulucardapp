import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type Plan } from '@/types';
import { Link } from '@inertiajs/react';

interface PlanCardProps {
    plan: Plan;
    isButtonDisabled?: boolean;
    billing?: boolean;
}

const ANIMATION_DELAY = '0.2s'; 


const MostPopularBadge = () => (
    <div className="absolute -top-3 right-8 transform">
        <div className="bg-brand-purple rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Most Popular
        </div>
    </div>
);

const PricingDisplay = ({ plan }: { plan: Plan }) => (
    <div className="mt-4">
        <span className="text-4xl font-bold">
            {plan.price < 0 ? 'Custom Pricing' : plan.price === 0 ? 'Free' : `Birr ${plan.price}`}
        </span>
        <span className="text-muted-foreground ml-2">
            {plan.price === 0 ? 'forever' : plan.price < 0 ? '' : '/ year'}
        </span>
    </div>
);

const FeatureItem = ({ feature }: { feature: string }) => (
    <li className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="text-brand-purple mt-0.5 mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
        <span>{feature}</span>
    </li>
);

export default function PlanCard({
    plan,
    isButtonDisabled = false,
    billing = false,
}: PlanCardProps) {
    return (
        <div
            className={`animate-fade-in relative rounded-xl border bg-white p-8 shadow-sm ${
                plan.most_popular ? 'border-brand-purple border-2 shadow-md' : 'border-border'
            }`}
            style={{ animationDelay: ANIMATION_DELAY }}
        >
            {plan.most_popular && <MostPopularBadge />}

            <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <PricingDisplay plan={plan} />
                <p className="text-muted-foreground mt-3">{plan.description}</p>
            </div>

            <Separator className="my-6" />

            <ul className="mb-8 space-y-4">
                <FeatureItem 
                    feature={`${plan.number_of_digital_business_card <= 0 ? (plan.number_of_digital_business_card < 0 ? 'Unlimited' : 'No') : plan.number_of_digital_business_card} digital business card${plan.number_of_digital_business_card === 1 ? '' : 's'}`} 
                />
                <FeatureItem 
                    feature={`${plan.number_of_service <= 0 ? (plan.number_of_service < 0 ? 'Unlimited' : 'No') : plan.number_of_service} service${plan.number_of_service === 1 ? '' : 's'}`} 
                />
                <FeatureItem 
                    feature={`${plan.number_of_nfc_business_card <= 0 ? (plan.number_of_nfc_business_card < 0 ? 'Unlimited' : 'No') : plan.number_of_nfc_business_card} NFC business card${plan.number_of_nfc_business_card === 1 ? '' : 's'}`} 
                />
                <FeatureItem 
                    feature={`${plan.number_of_gallery <= 0 ? (plan.number_of_gallery < 0 ? 'Unlimited' : 'No') : plan.number_of_gallery} galler${plan.number_of_gallery === 1 ? 'y' : 'ies'}`} 
                />
                {plan.features?.map((feature, index) => (
                    <FeatureItem key={index} feature={feature} />
                ))}
            </ul>

            {isButtonDisabled ? (
                <Button className="w-full" variant="secondary" disabled>
                    {plan.price < 0 ? 'Contact Sales' : 'Get Started'}
                </Button>
            ) : (
                <Button
                    asChild
                    className={`w-full ${plan.most_popular ? 'bg-brand-purple hover:bg-brand-purple-dark' : ''}`}
                    variant={plan.most_popular ? 'default' : 'outline'}
                >
                    <Link href={plan.price < 0 ? '/contact-sales' : billing ? route('checkout', { plan: plan.id }) : route('register')}>
                        {plan.price < 0 ? 'Contact Sales' : billing ? 'Upgrade Now' : 'Get Started'}
                    </Link>
                </Button>
            )}
        </div>
    );
}
