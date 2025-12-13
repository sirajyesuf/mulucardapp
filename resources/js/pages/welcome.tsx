import Footer from '@/components/footer';
import NavBar from '@/components/NavBar';
import PlanCard from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { type Plan, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Palette, Repeat, Share2, Shield, Smartphone, Zap } from 'lucide-react';
import { useEffect } from 'react';

const Hero = () => {
    return (
        <section className="bg-background relative overflow-hidden py-24 md:py-36">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div className="max-w-2xl space-y-8 lg:max-w-none">
                        <div>
                            <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Your digital identity, reimagined
                            </div>
                            <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                Digital Business Cards for Modern Professionals
                            </h1>
                            <p className="text-foreground mt-6 text-lg">
                                Share your contact information instantly. Create beautiful digital business cards that leave a lasting impression.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <Link href={route('register')}>Create Your Card</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const features = [
    {
        icon: <Smartphone className="text-primary h-6 w-6" />,
        title: 'Mobile-First Design',
        description: 'Optimized for smartphones with a responsive design that works on any device.',
    },
    {
        icon: <Share2 className="text-primary h-6 w-6" />,
        title: 'Instant Sharing',
        description: 'Share your digital card via QR code, and tap.',
    },
    {
        icon: <Zap className="text-primary h-6 w-6" />,
        title: 'Real-Time Updates',
        description: 'Update your information once and it changes everywhere your card is shared.',
    },
    {
        icon: <Repeat className="text-primary h-6 w-6" />,
        title: 'Analytics & Insights',
        description: 'Track when and how often your card is viewed with detailed analytics.',
    },
    {
        icon: <Shield className="text-primary h-6 w-6" />,
        title: 'Privacy Controls',
        description: 'Choose what information to share with advanced privacy settings.',
    },
    {
        icon: <Palette className="text-primary h-6 w-6" />,
        title: 'Customizable Design',
        description: 'Personalize your card with custom colors, layouts, and interactive elements.',
    },
];

const Features = () => {
    return (
        <section id="features" className="py-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                        Why choose mulucard
                    </div>
                    <h2 className="text-foreground text-3xl font-bold md:text-4xl">Features designed for professionals</h2>
                    <p className="mt-4 text-foreground">
                        Our digital business cards come packed with features to help you stand out and connect effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-card rounded-xl border p-6 shadow-sm">
                            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">{feature.icon}</div>
                            <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                            <p className="text-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

function Index({ plans }: { plans: Plan[] }) {
    const { auth } = usePage<SharedData>().props;

    // Add subtle fade-in effect when the page loads
    useEffect(() => {
        document.body.classList.add('animate-fade-in');
        return () => {
            document.body.classList.remove('animate-fade-in');
        };
    }, []);

    return (
        <div className="bg-background flex min-h-screen flex-col">
            <NavBar />

            <main className="bg-background">
                <Hero />
                <Features />

                {/* How It Works Section */}
                <section id="how-it-works" className="bg-background py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Simple process
                            </div>
                            <h2 className="text-foreground text-3xl font-bold md:text-4xl">How It Works</h2>
                            <p className="mt-4 text-lg text-foreground">
                                Create and share your digital business card in minutes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                            <div className="text-center">
                                <div className="bg-primary text-primary-foreground mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl">
                                    1
                                </div>
                                <h3 className="text-foreground mb-3 text-xl font-semibold">Create your card</h3>
                                <p className="text-foreground">Sign up and use our intuitive editor to create your perfect digital business card.</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary text-primary-foreground mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl">
                                    2
                                </div>
                                <h3 className="text-foreground mb-3 text-xl font-semibold">Customize design</h3>
                                <p className="text-foreground">Add your details, social profiles, and customize the design to match your brand.</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary text-primary-foreground mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl">
                                    3
                                </div>
                                <h3 className="text-foreground mb-3 text-xl font-semibold">Share instantly</h3>
                                <p className="text-foreground">Share via QR code, NFC, email, or direct link. Connect with anyone, anywhere.</p>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Button size="lg">
                                Get Started For Free
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Pricing plans
                            </div>
                            <h2 className="text-foreground text-3xl font-bold md:text-4xl">Simple, transparent pricing</h2>
                            <p className="text-foreground mt-4 text-lg">Choose perfect plan for your needs with no hidden fees.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {plans.map((plan, index) => (
                                <PlanCard key={index} plan={plan} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="bg-card mx-auto max-w-4xl rounded-2xl border-2 p-10 text-center shadow-none md:p-16">
                            <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">Ready to go digital?</h2>
                            <p className="text-foreground mb-8 text-lg">
                                Join thousands of professionals who are already using mulucard to make connections that matter.
                            </p>
                            <Button size="lg" asChild>
                                <Link href={route('register')}>Create Your Free Card</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Index;
