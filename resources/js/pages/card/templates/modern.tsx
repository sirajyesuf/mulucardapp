import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { MuluCardProps } from '@/pages/card/mulu-card-props';
import { CardAvatarRow } from '@/pages/card/parts/card-avatar-row';
import { CardBanner } from '@/pages/card/parts/card-banner';
import { CardBusinessHours } from '@/pages/card/parts/card-business-hours';
import { CardContactActions } from '@/pages/card/parts/card-contact-actions';
import { CardGalleriesSection } from '@/pages/card/parts/card-galleries-section';
import { CardHeadline } from '@/pages/card/parts/card-headline';
import { CardIdentity } from '@/pages/card/parts/card-identity';
import { CardLocationBlock } from '@/pages/card/parts/card-location-block';
import { CardServicesSection } from '@/pages/card/parts/card-services-section';
import { CardSocialLinks } from '@/pages/card/parts/card-social-links';

export function ModernCardTemplate(props: MuluCardProps) {
    const {
        banner,
        avatar,
        logo,
        banner_color,
        links,
        first_name,
        last_name,
        organization,
        job_title,
        phone,
        email,
        headline,
        address,
        location,
        galleries,
        services,
        business_hours,
        business_hours_enabled,
    } = props;

    return (
        <Card className="bg-background w-full overflow-hidden rounded-xl border border-border/60 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <CardHeader className="bg-background w-full border-b border-border/40 p-0 pb-1 dark:bg-slate-950">
                <CardBanner banner={banner} className="h-32" />
                <CardAvatarRow
                    avatar={avatar}
                    logo={logo}
                    overlapClassName="-mt-10"
                    avatarFrameClassName="h-20 w-20"
                    logoFrameClassName="h-16 w-16"
                />
            </CardHeader>
            <CardContent className="bg-background flex flex-col gap-3 border-none px-4 pb-4 pt-4 dark:bg-slate-950">
                <CardHeadline headline={headline} className="text-foreground px-0 text-left text-base font-medium leading-snug" />
                <CardIdentity
                    first_name={first_name}
                    last_name={last_name}
                    organization={organization}
                    job_title={job_title}
                    className="mb-0 flex flex-col items-start gap-1 border-none"
                    nameClassName="text-foreground flex flex-row flex-wrap gap-x-2 text-xl font-semibold capitalize"
                    organizationClassName="text-muted-foreground text-sm font-normal"
                    jobTitleClassName="text-foreground text-sm font-semibold"
                />
                <CardSocialLinks
                    links={links}
                    banner_color={banner_color}
                    className="flex flex-row flex-wrap items-center justify-start gap-2 border-none border-t border-border/40 pt-3"
                    iconWrapperClassName="flex h-9 w-9 items-center justify-center rounded-full"
                />
                <CardContactActions
                    phone={phone}
                    email={email}
                    banner_color={banner_color}
                    className="flex w-full flex-row flex-wrap gap-2 border-none p-0 text-center text-sm font-semibold capitalize text-white"
                    buttonClassName="min-w-[120px] flex-1 rounded-xl border-none px-3 py-2.5"
                />
                <CardServicesSection services={services} className="border-border/60 border shadow-none" />
                <CardGalleriesSection galleries={galleries} className="border-border/60 border shadow-none" />
                <CardBusinessHours enabled={business_hours_enabled} business_hours={business_hours} />
                <CardLocationBlock address={address} location={location} banner_color={banner_color} className="flex flex-col gap-2 rounded-lg border-none p-0 pt-1 shadow-none" />
            </CardContent>
        </Card>
    );
}
