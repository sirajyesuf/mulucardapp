import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({ className, alt = 'MuluCard', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return <img src="/MULU CARD-01.png" alt={alt} className={className} {...props} />;
}
