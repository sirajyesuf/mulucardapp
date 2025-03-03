import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <header className="flex h-12 flex-row items-center justify-between border-b-2 bg-gray-100 px-8 shadow-lg">
                <div className="">Mulucard</div>

                <div>
                    <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
                        Dashboard
                    </Link>
                    <Link href="/profile" className="ml-4 text-blue-500 hover:text-blue-700">
                        Profile
                    </Link>
                    <Link href="/settings" className="ml-4 text-blue-500 hover:text-blue-700">
                        Settings
                    </Link>
                </div>
            </header>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Transform your ideas into reality
                                </h1>
                                <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                    Our platform helps you build, deploy, and scale your projects faster than ever before. Start your journey today.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    href="#"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="#"
                                    className="border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-lg md:aspect-video lg:aspect-square">
                                <img src="/placeholder.svg?height=600&width=600" alt="Hero image" className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
