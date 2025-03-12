import { Link } from '@inertiajs/react';
import { Facebook } from 'lucide-react';
export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-4 border-t-2 p-2">
            <div className="mx-auto flex w-xl flex-row items-center justify-between border-none">
                <Link href="home">Home</Link>
                <Link href="home">Home</Link>
                <Link href="home">Home</Link>
                <Link href="home">Home</Link>
                <Link href="home">Home</Link>
                <Link href="home">Home</Link>
            </div>

            <div className="flex flex-row items-center justify-center gap-4 border-none p-0">
                <Facebook size={50} className="rounded-full border-2 bg-white p-2" />
                <Facebook size={50} className="rounded-full border-2 bg-white p-2" />
                <Facebook size={50} className="rounded-full border-2 p-2" />
                <Facebook size={50} className="rounded-full border-2 bg-white p-2" />
                <Facebook size={50} className="rounded-full border-2 bg-white p-2" />
                <Facebook size={50} className="rounded-full border-2 bg-white p-2" />
            </div>
        </footer>
    );
}
