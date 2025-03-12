import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-2 border-t-2 py-4">
            <div className="flex flex-row items-center justify-between gap-8 border-none p-2 font-bold">
                <Link href="home">Home</Link>
                <Link href="home">Blog</Link>
                <Link href="home">Privacy Policy</Link>
                <Link href="home">terms</Link>
            </div>

            <div className="flex flex-row items-center justify-center gap-4 border-none p-0">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                    <a href="/" className="text-xl font-bold text-black">
                        <Facebook className="h-5 w-5 text-white" />
                    </a>
                </div>

                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                    <a href="/" className="text-xl font-bold text-black">
                        <Twitter className="h-5 w-5 text-white" />
                    </a>
                </div>

                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                    <a href="/" className="text-xl font-bold text-black">
                        <Instagram className="h-5 w-5 text-white" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
