import PlanCard from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type Plan, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronRight, Github, Instagram, Twitter } from 'lucide-react';
import { useEffect } from 'react';

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
                                <span>Create Your Card</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button variant="outline" size="lg">
                                View Templates
                            </Button>
                        </div>

                        {/* <div className="pt-4">
                            <p className="text-muted-foreground text-sm font-medium">Trusted by professionals from companies like</p>
                            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70">
                                <span className="font-semibold">Google</span>
                                <span className="font-semibold">Microsoft</span>
                                <span className="font-semibold">Apple</span>
                                <span className="font-semibold">Amazon</span>
                            </div>
                        </div> */}
                    </div>

                    {/* <div className="animate-fade-in-right relative">
                        <div className="from-brand-purple/20 animate-float absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr to-transparent blur-3xl"></div>
                        <div className="mx-auto w-full max-w-md lg:ml-auto">
                            <CardPreview />
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-50 px-4 py-4 transition-all duration-300 md:px-8',
                isScrolled ? 'glass shadow-sm backdrop-blur-lg' : 'bg-transparent',
            )}
        >
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center gap-[1px] text-xl font-semibold">
                        <span className="text-brand-purple">Mulu</span>
                        <span>Card</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <a href="#features" className="hover:text-brand-purple text-sm font-medium transition-colors">
                            Features
                        </a>
                        <a href="#how-it-works" className="hover:text-brand-purple text-sm font-medium transition-colors">
                            How It Works
                        </a>
                        <a href="#pricing" className="hover:text-brand-purple text-sm font-medium transition-colors">
                            Pricing
                        </a>
                    </nav>

                    {
                        auth.user ? (
                            <div className="hidden items-center gap-4 md:flex">
                                <Button className="bg-brand-purple hover:bg-brand-purple-dark transition-colors">
                                    <Link href={route('dashboard')}>Dashboard</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden items-center gap-4 md:flex">
                                <Button variant="ghost" className="font-medium">
                                    <Link href={route('login')}>Log in</Link>
                                </Button>
                                <Button className="bg-brand-purple hover:bg-brand-purple-dark transition-colors">
                                    <Link href={route('register')}>Get Started</Link>
                                </Button>
                            </div>
                        )
                    }

                    {/* <div className="hidden items-center gap-4 md:flex">
                        <Button variant="ghost" className="font-medium">
                            <Link href={route('login')}>Log in</Link>
                        </Button>
                        <Button className="bg-brand-purple hover:bg-brand-purple-dark transition-colors">
                            <Link href={route('register')}>Get Started</Link>
                        </Button>
                    </div> */}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="h-screen glass animate-fade-in absolute top-full right-0 left-0 p-4 shadow-md md:hidden bg-gray-50">
                    <nav className="flex flex-col gap-2 py-4">
                        <a
                            href="#features"
                            className="hover:bg-secondary rounded-md px-4 py-2 text-sm font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="hover:bg-secondary rounded-md px-4 py-2 text-sm font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            How It Works
                        </a>
                        <a
                            href="#pricing"
                            className="hover:bg-secondary rounded-md px-4 py-2 text-sm font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </a>
                        <div className="mt-2 flex flex-col gap-2">
                            <Button variant="ghost" className="justify-start font-medium">
                                Log in
                            </Button>
                            <Button className="bg-brand-purple hover:bg-brand-purple-dark transition-colors">Get Started</Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t bg-white">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
                    <div className="md:col-span-1">
                        <a href="/" className="mb-4 inline-block">
                            <span className="flex items-center text-xl font-semibold">
                                <span className="text-brand-purple">mulu</span>
                                <span>card</span>
                            </span>
                        </a>
                        <p className="text-muted-foreground mb-4 text-sm">Modern digital business cards for professionals.</p>
                        <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Instagram className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Templates
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-muted-foreground text-sm">&copy; {currentYear} Mulucard. All rights reserved.</p>
                </div>
            </div>

            {/* Fixed banner at the bottom of the screen */}
            <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 flex justify-center">
                <div className="bg-brand-purple mx-auto mb-4 flex h-12 w-auto items-center justify-center rounded-full border-none px-6 text-xs text-white">
                    a free digital business card from mulucard
                </div>
            </div>
        </footer>
    );
};

// const CardPreview = () => {
//     return (
//         <div className="relative">
//             <div className="business-card glass animate-float p-6">
//                 <div className="from-brand-purple to-brand-purple-light absolute top-0 right-0 left-0 h-24 rounded-t-xl bg-gradient-to-r"></div>

//                 <div className="relative flex h-full flex-col">
//                     <div className="mb-6 flex items-start justify-between">
//                         <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
//                             <img
//                                 src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
//                                 alt="Profile"
//                             />
//                         </Avatar>

//                         <div className="mt-2">
//                             <h3 className="text-muted-foreground text-xs tracking-wider uppercase">mulucard</h3>
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <h2 className="text-xl font-bold">Alexander Thompson</h2>
//                         <p className="text-muted-foreground text-sm">Product Designer at Design Co.</p>
//                     </div>

//                     <div className="mt-6 flex-grow space-y-3">
//                         <div className="flex items-center gap-3">
//                             <Phone className="text-brand-purple h-4 w-4" />
//                             <span className="text-sm">(555) 123-4567</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <Mail className="text-brand-purple h-4 w-4" />
//                             <span className="text-sm">alex.thompson@example.com</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <Globe className="text-brand-purple h-4 w-4" />
//                             <span className="text-sm">www.alexthompson.com</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <MapPin className="text-brand-purple h-4 w-4" />
//                             <span className="text-sm">San Francisco, CA</span>
//                         </div>
//                     </div>

//                     <div className="mt-6 flex items-center gap-2">
//                         <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0077B5]">
//                             <Linkedin className="h-3.5 w-3.5 text-white" />
//                         </div>
//                         <div className="bg-muted h-1.5 w-1.5 rounded-full"></div>
//                         <div className="ml-auto">
//                             <span className="text-muted-foreground text-xs">Scan or tap to connect</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Card Shadow */}
//             <div className="absolute right-4 -bottom-2 left-4 h-[10px] rounded-full bg-black/10 blur-md"></div>
//         </div>
//     );
// };

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
        description: 'Share your digital card via QR code, tap, link, or email with a single click.',
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
    console.log(auth);
    console.log(plans);

    // Add subtle fade-in effect when the page loads
    useEffect(() => {
        document.body.classList.add('animate-fade-in');
        return () => {
            document.body.classList.remove('animate-fade-in');
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

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
                                Create Your Free Card
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
