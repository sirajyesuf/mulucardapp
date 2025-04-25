import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function  Navbar(){
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