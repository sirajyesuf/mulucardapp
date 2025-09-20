import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronRight, Shield, QrCode, Smartphone, Globe, Users, Zap, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div className="animate-fade-in-left max-w-2xl space-y-8 lg:max-w-none">
                        <div>
                            <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                                Blockchain-Verified Digital Identity
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                MuluCard Pro: Blockchain-Backed Digital Identity
                            </h1>
                            <p className="text-muted-foreground mt-6 text-lg">
                                NFC & QR cards linked to Cardano-verified profiles, providing secure, blockchain-backed IDs for professionals, events, and organizations.
                            </p>
                        </div>

                    </div>

                    <div className="animate-fade-in-right">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-brand-purple/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <QrCode className="h-8 w-8 mx-auto mb-2 text-brand-purple" />
                                        <p className="text-sm font-medium">QR Cards</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <Smartphone className="h-8 w-8 mx-auto mb-2 text-brand-purple" />
                                        <p className="text-sm font-medium">NFC Cards</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <Shield className="h-8 w-8 mx-auto mb-2 text-brand-purple" />
                                        <p className="text-sm font-medium">Cardano Verified</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4 text-center">
                                        <Globe className="h-8 w-8 mx-auto mb-2 text-brand-purple" />
                                        <p className="text-sm font-medium">Global Access</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const features = [
    {
        icon: <Shield className="text-brand-purple h-6 w-6" />,
        title: 'Cardano-Verified Profiles',
        description: 'Secure, blockchain-backed identity verification using Cardano technology.',
    },
    {
        icon: <QrCode className="text-brand-purple h-6 w-6" />,
        title: 'NFC & QR Technology',
        description: 'Dual technology approach for maximum compatibility and accessibility.',
    },
    {
        icon: <Users className="text-brand-purple h-6 w-6" />,
        title: 'Professional Networking',
        description: 'Perfect for professionals, events, and organizational identity management.',
    },
    {
        icon: <Globe className="text-brand-purple h-6 w-6" />,
        title: 'Africa-Focused Scaling',
        description: 'Designed to strengthen the Cardano ecosystem across Africa.',
    },
    {
        icon: <Zap className="text-brand-purple h-6 w-6" />,
        title: 'Real-World Adoption',
        description: 'Introduces blockchain technology to non-crypto users through tangible products.',
    },
    {
        icon: <CheckCircle className="text-brand-purple h-6 w-6" />,
        title: 'Fraud Reduction',
        description: 'Enhanced security and trust through verifiable blockchain credentials.',
    },
];

const Features = () => {
    return (
        <section id="features" className="bg-secondary/50 py-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="animate-fade-in mx-auto mb-16 max-w-3xl text-center">
                    <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                        Key Features
                    </div>
                    <h2 className="text-3xl font-bold md:text-4xl">Revolutionary Blockchain Identity</h2>
                    <p className="text-muted-foreground mt-4 text-lg">
                        MuluCard Pro combines cutting-edge blockchain technology with practical, everyday applications.
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

const ImpactSection = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="animate-fade-in mx-auto mb-16 max-w-3xl text-center">
                    <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                        Ecosystem Impact
                    </div>
                    <h2 className="text-3xl font-bold md:text-4xl">Expanding Cardano Adoption</h2>
                    <p className="text-muted-foreground mt-4 text-lg">
                        MuluCard Pro will expand Cardano adoption by introducing blockchain technology to new audiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="animate-fade-in space-y-8" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                            <h3 className="mb-4 text-xl font-semibold">Targeting New Audiences</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>Introduces blockchain to professionals, SMEs, and institutions</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>Creates trustworthy, verifiable identities</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>Increases confidence in on-chain credentials</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>Boosts wallet creation and engagement</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="animate-fade-in space-y-8" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                            <h3 className="mb-4 text-xl font-semibold">Real-World Applications</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>Practical Cardano use cases beyond finance</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>DIDs and verifiable credentials for everyday activities</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 h-4 w-4 flex-shrink-0" />
                                    <span>Networking, events, and education applications</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span>Showcases real-world impact on security and efficiency</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HybridApproach = () => {
    return (
        <section className="bg-secondary/50 py-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                    <div className="animate-fade-in-left">
                        <div className="bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium">
                            Hybrid Innovation
                        </div>
                        <h2 className="text-3xl font-bold md:text-4xl mb-6">Physical Meets Digital</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            MuluCard Pro combines physical NFC cards with Cardano-verified digital profiles, 
                            bridging offline and online identity verification.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-brand-purple/20 rounded-full p-2 mr-4 mt-1">
                                    <Smartphone className="h-5 w-5 text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Introduces Non-Crypto Users</h3>
                                    <p className="text-muted-foreground text-sm">Makes blockchain accessible through familiar physical products</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-brand-purple/20 rounded-full p-2 mr-4 mt-1">
                                    <Shield className="h-5 w-5 text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Reduces Fraud</h3>
                                    <p className="text-muted-foreground text-sm">Enhanced security through verifiable blockchain credentials</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-brand-purple/20 rounded-full p-2 mr-4 mt-1">
                                    <Globe className="h-5 w-5 text-brand-purple" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Scalable Across Africa</h3>
                                    <p className="text-muted-foreground text-sm">Making identity verification more secure, convenient, and accessible</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-fade-in-right">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-brand-purple/10 to-blue-500/10 rounded-2xl p-8 border border-border/50">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="bg-white rounded-lg p-6 shadow-sm">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-brand-purple/10 rounded-lg p-2 mr-3">
                                                <QrCode className="h-6 w-6 text-brand-purple" />
                                            </div>
                                            <h3 className="font-semibold">Physical NFC Card</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm">Tap to instantly share verified identity</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-6 shadow-sm">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-brand-purple/10 rounded-lg p-2 mr-3">
                                                <Shield className="h-6 w-6 text-brand-purple" />
                                            </div>
                                            <h3 className="font-semibold">Cardano Verification</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm">Blockchain-backed secure credentials</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-6 shadow-sm">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-brand-purple/10 rounded-lg p-2 mr-3">
                                                <Users className="h-6 w-6 text-brand-purple" />
                                            </div>
                                            <h3 className="font-semibold">Digital Profile</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm">Comprehensive professional information</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTA = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="bg-gradient-to-r from-brand-purple to-blue-600 animate-fade-in mx-auto max-w-4xl rounded-2xl p-10 text-center text-white md:p-16">
                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready for the Future of Identity?</h2>
                    <p className="mb-8 text-lg opacity-90">
                        Join the blockchain revolution with MuluCard Pro. Secure, verifiable, and designed for the real world.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default function MulucardPro() {
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
                <ImpactSection />
                <HybridApproach />
                <CTA />
            </main>

            <Footer />
        </div>
    );
}
