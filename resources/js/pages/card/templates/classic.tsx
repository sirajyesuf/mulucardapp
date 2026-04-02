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

export function ClassicCardTemplate(props: MuluCardProps) {
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
        <Card className="bg-background w-full overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm dark:bg-slate-950">
            <CardHeader className="bg-background w-full rounded-t-2xl border-none p-0 dark:bg-slate-950">
                <div className="overflow-hidden rounded-t-2xl">
                    <CardBanner banner={banner} className="h-[188px]" />
                </div>
                <CardAvatarRow avatar={avatar} logo={logo} overlapClassName="-mt-14" />
            </CardHeader>
            <CardContent className="bg-background flex flex-col gap-0 border-none px-4 pb-5 pt-1 dark:bg-slate-950">
                <CardIdentity
                    first_name={first_name}
                    last_name={last_name}
                    organization={organization}
                    job_title={job_title}
                    className="mb-2 flex flex-col items-center border-none pt-2"
                    nameClassName="text-foreground flex flex-row flex-wrap justify-center gap-x-3 text-2xl font-semibold capitalize tracking-tight"
                    detailLineClassName="text-sm font-medium text-muted-foreground"
                />
                <div className="border-border/30 my-3 border-t pt-4">
                    <CardHeadline headline={headline} className="text-muted-foreground px-1 text-center text-sm leading-relaxed" />
                </div>
                <div className="border-border/30 space-y-4 border-t pt-4">
                    <CardSocialLinks links={links} banner_color={banner_color} />
                    <CardContactActions phone={phone} email={email} banner_color={banner_color} />
                </div>
                <div className="border-border/30 mt-4 space-y-4 border-t pt-4">
                    <CardServicesSection services={services} />
                    <CardGalleriesSection galleries={galleries} />
                    <CardBusinessHours enabled={business_hours_enabled} business_hours={business_hours} />
                    <CardLocationBlock address={address} location={location} banner_color={banner_color} />
                </div>
            </CardContent>
        </Card>
    );
}
