import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter,Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                    <div className="md:col-span-1">
                        <a href="/" className="mb-4 inline-block">
                            <span className="flex items-center text-xl font-semibold">
                                <span className="text-brand-purple">mulu</span>
                                <span className="text-gray-900 dark:text-gray-100">card</span>
                            </span>
                        </a>
                        <p className="text-muted-foreground dark:text-gray-300 mb-4 text-sm">Modern digital business cards for professionals.</p>
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
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-muted-foreground dark:text-gray-300 hover:text-foreground text-sm transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground dark:text-gray-300 hover:text-foreground text-sm transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground dark:text-gray-300 hover:text-foreground text-sm transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href={route("privacy-policy")} className="text-muted-foreground dark:text-gray-300 hover:text-foreground text-sm transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href={route("terms")} className="text-muted-foreground dark:text-gray-300 hover:text-foreground text-sm transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-muted-foreground dark:text-gray-300 text-sm">&copy; {currentYear} Mulucard. All rights reserved.</p>
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