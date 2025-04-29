import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
export default function Dashboardfooter() {
    return (
        <footer className="flex flex-col items-center justify-center gap-2 border-t-2 py-2">
            <div className="flex flex-row items-center justify-between gap-2 border-none p-2 font-bold">
                <Link href="/">home</Link>
                <Link href={route('privacy-policy')}>privacy</Link>
                <Link href={route('terms')}>terms</Link>
            </div>

            <div className="flex flex-row items-center justify-center gap-4 border-none p-0">
                <div className="bg-brand-purple flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                    <a href="/" className="text-xl font-bold text-black">
                        <Facebook className="h-5 w-5 text-white" />
                    </a>
                </div>

                <div className="bg-brand-purple flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                    <a href="/" className="text-xl font-bold text-black">
                        <Twitter className="h-5 w-5 text-white" />
                    </a>
                </div>

                <div className="bg-brand-purple flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                    <a href="/" className="text-xl font-bold text-black">
                        <Instagram className="h-5 w-5 text-white" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
