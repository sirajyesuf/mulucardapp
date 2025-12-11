import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
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
                        <span className="text-foreground">Card</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <a href="#features" className="text-foreground text-sm font-medium transition-colors">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-foreground text-sm font-medium transition-colors">
                            How It Works
                        </a>
                        <a href="#pricing" className="text-foreground text-sm font-medium transition-colors">
                            Pricing
                        </a>
                    </nav>

                    {auth.user ? (
                        <div className="hidden items-center gap-4 md:flex">
                            <AppearanceToggleDropdown />
                            <Button className="text-white transition-colors">
                                <Link href={route('dashboard')}>Dashboard</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden items-center gap-4 md:flex">
                            <AppearanceToggleDropdown />
                            <Button variant="ghost" className="font-medium">
                                <Link href={route('login')}>Log in</Link>
                            </Button>
                            <Button className="text-white transition-colors">
                                <Link href={route('register')}>Get Started</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="text-foreground md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="glass animate-fade-in bg-background/95 absolute top-full right-0 left-0 h-screen p-4 shadow-md md:hidden backdrop-blur-lg">
                    {/* <nav className="flex flex-col gap-2 py-4"> */}
                    <nav className="flex flex-col items-start gap-8 border-none">
                        <a
                            href="#features"
                            className="text-foreground text-sm font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-foreground text-sm font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            How It Works
                        </a>
                        <a
                            href="#pricing"
                            className="text-foreground text-sm font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </a>
                        <AppearanceToggleDropdown />
                        {auth.user ? (
                            <div className="">
                                <Button className="text-white transition-colors">
                                    <Link href={route('dashboard')}>Dashboard</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 border-none">
                                <Button variant="outline" className="font-medium">
                                    <Link href={route('login')}>Log in</Link>
                                </Button>
                                <Button className="text-white transition-colors">
                                    <Link href={route('register')}>Get Started</Link>
                                </Button>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
