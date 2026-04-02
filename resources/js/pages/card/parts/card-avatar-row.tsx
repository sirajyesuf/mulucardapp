import type { Image } from '@/types';

type CardAvatarRowProps = {
    avatar: Image;
    logo: Image | null;
    overlapClassName?: string;
    avatarFrameClassName?: string;
    logoFrameClassName?: string;
    /** Applied to avatar frame and image (default round). */
    avatarRadiusClassName?: string;
    /** Applied to logo frame and image (default round image, rounded-lg frame). */
    logoRadiusClassName?: string;
};

export function CardAvatarRow({
    avatar,
    logo,
    overlapClassName = '-mt-14',
    avatarFrameClassName = 'h-[100px] w-[100px]',
    logoFrameClassName = 'h-[100px] w-[100px]',
    avatarRadiusClassName = 'rounded-full',
    /** Logo frame + image; default matches previous rounded-lg frame look. */
    logoRadiusClassName = 'rounded-lg',
}: CardAvatarRowProps) {
    const hasLogo = Boolean(logo?.path);

    return (
        <div className={`relative flex flex-row border-none px-4 ${overlapClassName} ${hasLogo ? 'justify-between' : 'justify-center'}`}>
            <div
                className={`border-border bg-card flex items-center justify-center border-4 dark:border-slate-700 dark:bg-slate-900 ${avatarRadiusClassName} ${avatarFrameClassName} ${hasLogo ? '' : 'mx-auto'}`}
            >
                <img src={avatar.path || ''} alt="" className={`h-full w-full border-none object-contain ${avatarRadiusClassName}`} />
            </div>
            {hasLogo && logo?.path && (
                <div
                    className={`border-border bg-card flex items-center justify-center border-4 dark:border-slate-700 dark:bg-slate-900 ${logoRadiusClassName} ${logoFrameClassName}`}
                >
                    <img src={logo.path} alt="" className={`h-full w-full border-none object-contain ${logoRadiusClassName}`} />
                </div>
            )}
        </div>
    );
}
