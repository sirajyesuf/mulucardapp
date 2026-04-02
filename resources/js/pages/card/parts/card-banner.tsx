import type { Image } from '@/types';

type CardBannerProps = {
    banner: Image;
    className?: string;
};

export function CardBanner({ banner, className = 'h-[200px]' }: CardBannerProps) {
    return (
        <div className={`w-full ${className}`}>
            {banner.path && <img src={banner.path} alt="" className="h-full w-full border-none object-cover" />}
        </div>
    );
}
