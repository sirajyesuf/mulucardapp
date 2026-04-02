import { socialIconMap } from '@/lib/socialIcons';
import { Globe } from 'lucide-react';
import type { MuluCardProps } from '@/pages/card/mulu-card-props';

type CardSocialLinksProps = {
    links: MuluCardProps['links'];
    banner_color: string;
    className?: string;
    iconWrapperClassName?: string;
};

export function CardSocialLinks({
    links,
    banner_color,
    className = 'flex flex-row flex-wrap items-start justify-center gap-2 border-none',
    iconWrapperClassName = 'flex h-[40px] w-[40px] items-center justify-center rounded-full',
}: CardSocialLinksProps) {
    return (
        <div className={className}>
            {links?.map((link, index) => {
                const Icon = socialIconMap[link.name.toLowerCase()] || Globe;
                return (
                    link.url && (
                        <div key={index} className="flex flex-row flex-wrap items-center gap-2 rounded-lg border-none p-0">
                            <div className={iconWrapperClassName} style={{ backgroundColor: banner_color }}>
                                <a href={link.url} className="text-xl font-bold text-black">
                                    <Icon className="h-5 w-5 text-white" />
                                </a>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
}
