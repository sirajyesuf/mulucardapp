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
                        <p className="mb-4 text-sm">Modern digital business cards for professionals.</p>
                        <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Button>

                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Instagram className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-foreground text-sm transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground text-sm transition-colors dark:text-black">
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
                        <h3 className="mb-4 font-semibold">Legal</h3>
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

            {/* Fixed banner at the bottom of the screen */}
            <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 flex justify-center">
                <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-auto items-center justify-center rounded-full border-none px-6 text-xs">
                    a free digital business card from mulucard
                </div>
            </div>
        </footer>
    );
}
