import { MapPin } from 'lucide-react';

type CardLocationBlockProps = {
    address: string | null;
    location: string | null;
    banner_color: string;
    className?: string;
};

export function CardLocationBlock({ address, location, banner_color, className = 'flex flex-col gap-2 rounded-lg border-none p-2 shadow-none' }: CardLocationBlockProps) {
    return (
        <div className={className}>
            {address && (
                <div className="flex items-center justify-center gap-2 p-2">
                    <MapPin className="h-8 w-8" color={banner_color} />
                    <p className="font-mute text-md">{address}</p>
                </div>
            )}
            {location && (
                <div className="cursor-pointer rounded-4xl p-2 text-center font-bold text-white" style={{ backgroundColor: banner_color }}>
                    <a href={location} target="_blank" rel="noreferrer" className="capitalize">
                        view on google map
                    </a>
                </div>
            )}
        </div>
    );
}
