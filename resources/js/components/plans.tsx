import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type Plan } from '@/types';

function FreePlan({ plan, billing }: { plan: Plan; billing?: boolean }) {
    return (
        <div className="border-border animate-fade-in rounded-xl border bg-white p-8 shadow-sm" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                    <span className="text-4xl font-bold">Free</span>
                    <span className="text-muted-foreground ml-2">forever</span>
                </div>
                <p className="text-muted-foreground mt-3">{plan.description}</p>
            </div>

            <Separator className="my-6" />

            <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                    <li className="flex items-start">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-brand-purple mt-0.5 mr-3 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span> {feature}</span>
                    </li>
                ))}
            </ul>

            {billing ? (
                <Button className="w-full" variant="outline">
                    upgrade now
                </Button>
            ) : (
                <Button className="w-full" variant="outline">
                    Get Started
                </Button>
            )}
        </div>
    );
}

function MostPopular({ plan, billing }: { plan: Plan; billing?: boolean }) {
    return (
        <div className="border-brand-purple animate-fade-in relative rounded-xl border-2 bg-white p-8 shadow-md" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <div className="bg-brand-purple rounded-full px-4 py-1 text-xs font-medium text-white">Most Popular hey</div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ year</span>
                </div>
                <p className="text-muted-foreground mt-3">{plan.description}</p>
            </div>

            <Separator className="my-6" />

            <ul className="mb-8 space-y-4">
                {plan.features.map((feature, index) => (
                    <li className="flex items-start" key={index}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-brand-purple mt-0.5 mr-3 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {billing ? (
                <Button className="mt-4 w-full" variant="outline">
                    upgrade now
                </Button>
            ) : (
                <Button className="bg-brand-purple hover:bg-brand-purple-dark w-full">Get Started</Button>
            )}
        </div>
    );
}

function EnterprisePlan({ plan }: { plan: Plan }) {
    return (
        <div className="border-border animate-fade-in rounded-xl border bg-white p-8 shadow-sm" style={{ animationDelay: '0.3s' }}>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ yearly</span>
                </div>
                <p className="text-muted-foreground mt-3">{plan.description}</p>
            </div>

            <Separator className="my-6" />

            <ul className="mb-8 space-y-4">
                {plan.features.map((feature, index) => (
                    <li className="flex items-start" key={index}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-brand-purple mt-0.5 mr-3 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Button className="w-full" variant="outline">
                Contact Sales
            </Button>
        </div>
    );
}

export { EnterprisePlan, FreePlan, MostPopular };
