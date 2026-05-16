import { usePage } from '@inertiajs/react';
import { ImgHTMLAttributes } from 'react';

import { type SharedData } from '@/types';

export default function AppLogoIcon({
    className,
    alt = 'MuluCard',
    src,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    const { logoUrl } = usePage<SharedData>().props;

    return <img src={src ?? logoUrl} alt={alt} className={className} {...props} />;
}
