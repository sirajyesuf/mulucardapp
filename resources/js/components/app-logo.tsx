import { usePage } from '@inertiajs/react';

import { type SharedData } from '@/types';

export default function AppLogo() {
    const { logoUrl } = usePage<SharedData>().props;

    return (
        <div className="flex items-center gap-2">
            <img src={logoUrl} alt="MuluCard" className="h-10 w-auto" />
            <div className="flex items-center gap-[1px] text-xl font-semibold text-[#148bfd]">
                <span>Mulu</span>
                <span>Card</span>
            </div>
        </div>
    );
}
