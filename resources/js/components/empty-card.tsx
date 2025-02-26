import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function EmptyCard() {
    return (
        <div className="bg-background flex flex-col items-center justify-center gap-24 rounded-lg px-4 py-2">
            <div className="text-xl font-bold capitalize">welcome to your cards page</div>
            <div className="flex flex-col items-center justify-center gap-4 p-4">
                <h2 className="text-xl font-extrabold">Create your first card</h2>
                <p className="text-md font-bold">Create a digital business card and start expanding your network</p>
                <Link
                    className="flex flex-row items-center justify-center gap-4 rounded-lg bg-[#7239d6] px-4 py-2 text-white shadow-md"
                    href="card/create"
                >
                    <Plus width={30} height={30} />
                    <span className="text-md font-bold capitalize">new card</span>
                </Link>
            </div>
        </div>
    );
}
