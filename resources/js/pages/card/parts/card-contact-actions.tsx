import { cn } from '@/lib/utils';
import { Mail, Phone } from 'lucide-react';

type CardContactActionsProps = {
    phone: string;
    email: string;
    banner_color: string;
    className?: string;
    buttonClassName?: string;
    variant?: 'solid' | 'outline' | 'bold';
};

const defaultContainerClass =
    'flex w-full flex-col gap-4 border-none p-2 text-center font-bold uppercase tracking-wide text-white';

export function CardContactActions({
    phone,
    email,
    banner_color,
    className,
    buttonClassName = 'rounded-4xl border-none p-2',
    variant = 'solid',
}: CardContactActionsProps) {
    if (variant === 'bold') {
        if (!phone && !email) {
            return null;
        }
        /** Outline chips like social tiles: rounded-2xl, border-2, icon + label in brand color */
        const tileClass =
            'inline-flex min-h-11 shrink-0 flex-row items-center gap-2 rounded-2xl border-2 bg-transparent px-3 py-2 shadow-none transition-opacity hover:opacity-85 active:opacity-75';

        return (
            <div
                className={cn(
                    'flex w-full flex-row flex-wrap items-center justify-center gap-3 border-none p-0',
                    className,
                )}
            >
                {phone ? (
                    <a
                        href={`tel:${phone}`}
                        className={tileClass}
                        style={{ borderColor: banner_color, color: banner_color }}
                    >
                        <Phone className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                        <span className="text-xs font-semibold uppercase tracking-wide">call me</span>
                    </a>
                ) : null}
                {email ? (
                    <a
                        href={`mailto:${email}`}
                        className={tileClass}
                        style={{ borderColor: banner_color, color: banner_color }}
                    >
                        <Mail className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                        <span className="text-xs font-semibold uppercase tracking-wide">email me</span>
                    </a>
                ) : null}
            </div>
        );
    }

    const isOutline = variant === 'outline';
    const shellStyle = isOutline
        ? { borderColor: banner_color, color: banner_color }
        : { backgroundColor: banner_color };

    return (
        <div className={cn(defaultContainerClass, className)}>
            {phone && (
                <div className={cn(buttonClassName, isOutline && 'border-2 bg-transparent')} style={shellStyle}>
                    <a href={`tel:${phone}`} className={isOutline ? 'text-inherit' : 'text-white'}>
                        call me
                    </a>
                </div>
            )}
            {email && (
                <div className={cn(buttonClassName, isOutline && 'border-2 bg-transparent')} style={shellStyle}>
                    <a href={`mailto:${email}`} className={isOutline ? 'text-inherit' : 'text-white'}>
                        email me
                    </a>
                </div>
            )}
        </div>
    );
}
