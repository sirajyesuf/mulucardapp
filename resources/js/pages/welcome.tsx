import Footer from '@/components/footer';
import NavBar from '@/components/NavBar';
import PlanCard from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { DEMO_MULU_CARD_PROPS } from '@/data/demo-mulu-card-props';
import MuluCard from '@/pages/card/card';
import { CARD_TEMPLATE_OPTIONS } from '@/pages/card/mulu-card-props';
import { type Plan } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, CheckCircle2, LayoutTemplate, Palette, QrCode, Repeat, Shield, Smartphone, Sparkles, Zap } from 'lucide-react';

const features = [
    {
        icon: Smartphone,
        title: 'Built for phones first',
        description: 'Your card opens cleanly on mobile, tablet, and desktop without asking people to install anything.',
    },
    {
        icon: QrCode,
        title: 'Share in one scan',
        description: 'Send your profile with QR, link, or NFC so meeting follow-up takes seconds instead of friction.',
    },
    {
        icon: Repeat,
        title: 'Update once, everywhere',
        description: 'Change your role, number, links, or brand assets once and every shared card stays current.',
    },
    {
        icon: BarChart3,
        title: 'See what gets attention',
        description: 'Track card views and understand which profiles are performing best after events and outreach.',
    },
    {
        icon: Shield,
        title: 'Control what people see',
        description: 'Decide which information is public and keep your digital presence polished and intentional.',
    },
    {
        icon: Palette,
        title: 'Brand it your way',
        description: 'Match your card to your colors, assets, and tone so it feels like part of your business.',
    },
];

const steps = [
    {
        number: '01',
        title: 'Create your profile',
        description: 'Add your contact details, links, services, galleries, and the information you want people to remember.',
    },
    {
        number: '02',
        title: 'Style your card',
        description: 'Choose the visuals, brand color, and layout details that make the page feel like you.',
    },
    {
        number: '03',
        title: 'Share and follow up',
        description: 'Send one link, one QR, or one tap and let people save your details without manual entry.',
    },
];

const highlights = ['Digital cards for professionals', 'Fast setup', 'QR and link sharing', 'Analytics included'];

function Hero() {
    return (
        <section className="relative overflow-hidden pt-28 pb-18 md:pt-36 md:pb-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.14),_transparent_24%),linear-gradient(to_bottom,_rgba(248,250,252,0.96),_rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.14),_transparent_22%),linear-gradient(to_bottom,_rgba(2,6,23,0.98),_rgba(2,6,23,1))]" />
            <div className="container mx-auto max-w-7xl px-4">
                <div className="max-w-3xl">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-200">
                            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                            Your digital identity, reimagined
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl dark:text-white">
                            A polished digital business card that is ready the moment you meet someone.
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                            MuluCard helps you share your details, brand, services, and portfolio in one clean page that is easy to open and easy to
                            remember.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button size="lg" asChild className="h-12 rounded-full px-6">
                                <Link href={route('register')}>
                                    Create your card
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="h-12 rounded-full px-6">
                                <a href="#pricing">See pricing</a>
                            </Button>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {highlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section id="features" className="py-20 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-14">
                    <div className="max-w-2xl">
                        <div className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                            Why MuluCard
                        </div>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white">
                            Everything needed to make your first impression feel current.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-orange-500 dark:bg-slate-900">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-slate-50/70 py-20 dark:bg-slate-950/60">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                        Simple workflow
                    </div>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white">
                        From setup to share in three steps
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        The experience is intentionally simple so you can spend time connecting, not configuring.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold tracking-[0.24em] text-slate-400">{step.number}</span>
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            </div>
                            <h3 className="mt-8 text-xl font-semibold text-slate-950 dark:text-white">{step.title}</h3>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" asChild className="rounded-full px-6">
                        <Link href={route('register')}>
                            Start building
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

function Templates() {
    return (
        <section id="templates" className="py-20 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                        <LayoutTemplate className="h-3.5 w-3.5" />
                        Templates
                    </div>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white">
                        Three layouts, one polished profile
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        Each template uses the same details you enter—pick the look that fits how you want to show up when someone opens your card.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
                    {CARD_TEMPLATE_OPTIONS.map((option) => (
                        <div key={option.id} className="flex flex-col items-center">
                            <h3 className="text-center text-xl font-semibold text-slate-950 dark:text-white">{option.label}</h3>
                            {option.description && (
                                <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                    {option.description}
                                </p>
                            )}
                            <div className="mt-6 w-full max-w-[500px] rounded-2xl p-1 md:bg-white/80 md:shadow-sm md:ring-1 md:ring-slate-200/70 md:backdrop-blur-sm dark:md:bg-slate-900/70 dark:md:shadow-black/20 dark:md:ring-white/10">
                                <MuluCard template={option.id} {...DEMO_MULU_CARD_PROPS} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Pricing({ plans }: { plans: Plan[] }) {
    return (
        <section id="pricing" className="py-20 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        Pricing
                    </div>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white">
                        Choose the plan that fits how you network
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        Start simple, then scale up for more cards, more services, and more branded presence.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="pb-20">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-[linear-gradient(135deg,#0f172a,#1e293b,#0f172a)] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.18)] md:p-12">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/80">
                                <Zap className="h-3.5 w-3.5 text-orange-400" />
                                Ready when you are
                            </div>
                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                                Build a sharper first impression before your next meeting.
                            </h2>
                            <p className="mt-4 max-w-2xl text-slate-300">
                                Create your card, share it in seconds, and keep your details current without printing anything again.
                            </p>
                        </div>

                        <div className="flex lg:justify-end">
                            <Button size="lg" asChild className="h-12 rounded-full px-6">
                                <Link href={route('register')}>
                                    Get started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Index({ plans }: { plans: Plan[] }) {
    return (
        <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
            <NavBar />

            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <Templates />
                <Pricing plans={plans} />
                <CTA />
            </main>

            <Footer />
        </div>
    );
}
