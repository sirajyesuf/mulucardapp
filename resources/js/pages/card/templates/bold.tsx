import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { MuluCardProps } from '@/pages/card/mulu-card-props';
import { CardAvatarRow } from '@/pages/card/parts/card-avatar-row';
import { CardBanner } from '@/pages/card/parts/card-banner';
import { CardBusinessHours } from '@/pages/card/parts/card-business-hours';
import { CardContactActions } from '@/pages/card/parts/card-contact-actions';
import { CardGalleriesSection } from '@/pages/card/parts/card-galleries-section';
import { CardIdentity } from '@/pages/card/parts/card-identity';
import { CardLocationBlock } from '@/pages/card/parts/card-location-block';
import { CardServicesSection } from '@/pages/card/parts/card-services-section';
import { CardSocialLinks } from '@/pages/card/parts/card-social-links';

export function BoldCardTemplate(props: MuluCardProps) {
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

    const hasHeadline = headline.trim().length > 0;

    return (
        <Card className="bg-background w-full overflow-hidden rounded-xl border-0 p-0 shadow-none dark:bg-slate-950">
            <CardHeader className="bg-background w-full border-none p-0 dark:bg-slate-950">
                <CardBanner banner={banner} className="h-56" />
                {hasHeadline ? (
                    <div className="relative z-10 w-full px-4 py-4 text-center text-white" style={{ backgroundColor: banner_color }}>
                        <p className="text-lg font-bold leading-snug md:text-xl">{headline}</p>
                    </div>
                ) : null}
                <CardAvatarRow
                    avatar={avatar}
                    logo={logo}
                    overlapClassName={hasHeadline ? '-mt-16' : '-mt-14'}
                    avatarFrameClassName="h-[120px] w-[120px] shadow-lg ring-4 ring-background dark:ring-slate-950"
                    logoFrameClassName="h-24 w-24 shadow-lg ring-4 ring-background dark:ring-slate-950"
                    avatarRadiusClassName="rounded-2xl"
                    logoRadiusClassName="rounded-2xl"
                />
            </CardHeader>
            <CardContent className="bg-background flex flex-col gap-4 border-none px-3 pb-5 pt-2 dark:bg-slate-950">
                <CardIdentity
                    first_name={first_name}
                    last_name={last_name}
                    organization={organization}
                    job_title={job_title}
                    className="mb-2 flex flex-col items-center border-none"
                    nameClassName="text-foreground flex flex-row flex-wrap justify-center gap-x-3 text-3xl font-bold capitalize tracking-tight md:text-4xl"
                    organizationClassName="text-muted-foreground mt-1 text-center text-sm font-medium"
                    jobTitleClassName="mt-0.5 text-center text-xs font-bold uppercase tracking-[0.2em]"
                    jobTitleStyle={{ color: banner_color }}
                />
                <CardSocialLinks
                    links={links}
                    banner_color={banner_color}
                    className="flex flex-row flex-wrap items-start justify-center gap-2 border-none"
                    iconWrapperClassName="flex h-12 w-12 items-center justify-center rounded-xl"
                />
                <CardContactActions
                    phone={phone}
                    email={email}
                    banner_color={banner_color}
                    className="flex w-full flex-row flex-wrap gap-2 border-none p-0 text-center text-sm font-bold capitalize text-white"
                    buttonClassName="min-w-[140px] flex-1 rounded-xl border-none px-4 py-3"
                />
                <CardServicesSection services={services} />
                <CardGalleriesSection galleries={galleries} />
                <CardBusinessHours enabled={business_hours_enabled} business_hours={business_hours} />
                <CardLocationBlock address={address} location={location} banner_color={banner_color} />
            </CardContent>
        </Card>
    );
}
