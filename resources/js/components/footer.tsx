import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background relative border-t">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                    <div className="md:col-span-1">
                        <a href="/" className="mb-4 inline-block">
                            <span className="flex items-center text-xl font-semibold">
                                <span className="text-primary">mulu</span>
                                <span className="text-foreground">card</span>
                            </span>
                        </a>
                        <p className="text-foreground mb-4 text-sm">Modern digital business cards for professionals.</p>
                        <div className="flex space-x-1">
                            <a href="https://web.facebook.com/profile.php?id=61570763007664" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Facebook</span>
                                </Button>
                            </a>

                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                                    <Twitter className="h-4 w-4" />
                                    <span className="sr-only">Twitter</span>
                                </Button>
                            </a>

                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                                    <Instagram className="h-4 w-4" />
                                    <span className="sr-only">Instagram</span>
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-foreground text-sm transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground text-sm transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors dark:text-gray-300">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href={route('privacy-policy')} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href={route('terms')} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    Terms of Service
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

            <div className="border-t border-slate-200/70 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="container mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                    a digital business card from MuluCard
                </div>
            </div>
        </footer>
    );
}
