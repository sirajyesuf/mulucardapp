import PlanCard from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type Plan, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronRight, Github, Instagram, Twitter } from 'lucide-react';
import { useEffect } from 'react';
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";

const DEFAULT_REDIRECTS = {
    billing: '/settings/billing/upgrade',
    register: '/register',
};

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div className="animate-fade-in-left max-w-2xl space-y-8 lg:max-w-none">
                        <div>
                            <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Your digital identity, reimagined
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                Digital Business Cards for Modern Professionals
                            </h1>
                            <p className="text-muted-foreground mt-6 text-lg">
                                Share your contact information instantly. Create beautiful digital business cards that leave a lasting impression.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark group transition-colors">
                                <Link href={route('register')}>Create Your Card</Link>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};






import { Palette, Repeat, Share2, Shield, Smartphone, Zap } from 'lucide-react';

const features = [
    {
        icon: <Smartphone className="text-brand-purple h-6 w-6" />,
        title: 'Mobile-First Design',
        description: 'Optimized for smartphones with a responsive design that works on any device.',
    },
    {
        icon: <Share2 className="text-brand-purple h-6 w-6" />,
        title: 'Instant Sharing',
        description: 'Share your digital card via QR code, and tap.',
    },
    {
        icon: <Zap className="text-brand-purple h-6 w-6" />,
        title: 'Real-Time Updates',
        description: 'Update your information once and it changes everywhere your card is shared.',
    },
    {
        icon: <Repeat className="text-brand-purple h-6 w-6" />,
        title: 'Analytics & Insights',
        description: 'Track when and how often your card is viewed with detailed analytics.',
    },
    {
        icon: <Shield className="text-brand-purple h-6 w-6" />,
        title: 'Privacy Controls',
        description: 'Choose what information to share with advanced privacy settings.',
    },
    {
        icon: <Palette className="text-brand-purple h-6 w-6" />,
        title: 'Customizable Design',
        description: 'Personalize your card with custom colors, layouts, and interactive elements.',
    },
];

const Features = () => {
    return (
        <section id="features" className="bg-secondary/50 py-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="animate-fade-in mx-auto mb-16 max-w-3xl text-center">
                    <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                        Why choose mulucard
                    </div>
                    <h2 className="text-3xl font-bold md:text-4xl">Features designed for professionals</h2>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Our digital business cards come packed with features to help you stand out and connect effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="border-border/50 animate-fade-in rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="bg-brand-purple/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">{feature.icon}</div>
                            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
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
        <div className="flex min-h-screen flex-col">
            <NavBar />

            <main>
                <Hero />
                <Features />

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="animate-fade-in mx-auto mb-16 max-w-3xl text-center">
                            <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Simple process
                            </div>
                            <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
                            <p className="text-muted-foreground mt-4 text-lg">Create and share your digital business card in minutes.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                            <div className="animate-fade-in text-center" style={{ animationDelay: '0.1s' }}>
                                <div className="bg-brand-purple mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white">
                                    1
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">Create your card</h3>
                                <p className="text-muted-foreground">
                                    Sign up and use our intuitive editor to create your perfect digital business card.
                                </p>
                            </div>

                            <div className="animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
                                <div className="bg-brand-purple mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white">
                                    2
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">Customize design</h3>
                                <p className="text-muted-foreground">
                                    Add your details, social profiles, and customize the design to match your brand.
                                </p>
                            </div>

                            <div className="animate-fade-in text-center" style={{ animationDelay: '0.3s' }}>
                                <div className="bg-brand-purple mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white">
                                    3
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">Share instantly</h3>
                                <p className="text-muted-foreground">Share via QR code, NFC, email, or direct link. Connect with anyone, anywhere.</p>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark transition-colors">
                                <span>Get Started For Free</span>
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="bg-secondary/50 py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="animate-fade-in mx-auto mb-16 max-w-3xl text-center">
                            <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Pricing plans
                            </div>
                            <h2 className="text-3xl font-bold md:text-4xl">Simple, transparent pricing</h2>
                            <p className="text-muted-foreground mt-4 text-lg">Choose the perfect plan for your needs with no hidden fees.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">


                            {[...plans]
                                .sort((a, b) => {
                                    return 0;
                                })
                                .map((plan, index) => {
                                    return (
                                        <PlanCard
                                            key={index}
                                            plan={plan}
                                          
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="bg-brand-purple animate-fade-in mx-auto max-w-4xl rounded-2xl p-10 text-center text-white md:p-16">
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to go digital?</h2>
                            <p className="mb-8 text-lg opacity-90">
                                Join thousands of professionals who are already using mulucard to make connections that matter.
                            </p>
                            <Button size="lg" variant="secondary" className="text-brand-purple bg-white hover:bg-white/90">
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
