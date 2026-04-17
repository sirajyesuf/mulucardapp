import { socialIconMap } from '@/lib/socialIcons';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import type { MuluCardProps } from '@/pages/card/mulu-card-props';

type CardSocialLinksProps = {
    links: MuluCardProps['links'];
    banner_color: string;
    className?: string;
    iconWrapperClassName?: string;
    /** Solid fill (default) or outlined chips for high-contrast templates */
    variant?: 'solid' | 'outline';
};

export function CardSocialLinks({
    links,
    banner_color,
    className = 'flex flex-row flex-wrap items-start justify-center gap-2 border-none',
    iconWrapperClassName = 'flex h-[40px] w-[40px] items-center justify-center rounded-full',
    variant = 'solid',
}: CardSocialLinksProps) {
    const isOutline = variant === 'outline';

    return (
        <div className={className}>
            {links?.map((link, index) => {
                const Icon = socialIconMap[link.name.toLowerCase()] || Globe;
                return (
                    link.url && (
                        <div key={index} className="flex flex-row flex-wrap items-center gap-2 rounded-lg border-none p-0">
                            <div
                                className={cn(iconWrapperClassName, isOutline && 'border-2 bg-transparent shadow-none')}
                                style={
                                    isOutline
                                        ? { borderColor: banner_color }
                                        : { backgroundColor: banner_color }
                                }
                            >
                                <a href={link.url} className="text-xl font-bold">
                                    <Icon
                                        className={cn('h-5 w-5', isOutline ? '' : 'text-white')}
                                        style={isOutline ? { color: banner_color } : undefined}
                                    />
                                </a>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
}
