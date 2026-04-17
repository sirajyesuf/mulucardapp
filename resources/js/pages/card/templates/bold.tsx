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

    return (
        <Card className="bg-background w-full overflow-hidden rounded-2xl border-0 shadow-none ring-1 ring-border/30 dark:bg-slate-950">
            <CardHeader className="relative isolate w-full border-none p-0">
                {/* Hero stays z-0; avatar row is z-10 so overlap sits above banner + gradients */}
                <div className="relative z-0 overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background from-15% via-transparent to-transparent" aria-hidden />
                    <div
                        className="absolute inset-0 z-[1] opacity-90 dark:opacity-95"
                        style={{
                            background: `linear-gradient(120deg, ${banner_color} 0%, transparent 50%, rgba(15, 23, 42, 0.55) 100%)`,
                        }}
                        aria-hidden
                    />
                    <div className="relative z-0">
                        <CardBanner banner={banner} className="h-52 sm:h-56" />
                    </div>
                </div>

                <div className="relative z-10">
                    <CardAvatarRow
                        avatar={avatar}
                        logo={logo}
                        overlapClassName="-mt-16"
                        avatarFrameClassName="h-[112px] w-[112px] shadow-xl"
                        logoFrameClassName="h-[88px] w-[88px] shadow-lg"
                        avatarRadiusClassName="rounded-full"
                        logoRadiusClassName="rounded-xl"
                    />
                </div>
            </CardHeader>

            <CardContent className="bg-background flex flex-col gap-0 border-none px-4 pb-8 pt-2 dark:bg-slate-950">
                <CardIdentity
                    first_name={first_name}
                    last_name={last_name}
                    organization={organization}
                    job_title={job_title}
                    className="mb-3 flex flex-col items-center border-none pt-1"
                    nameClassName="text-foreground flex flex-row flex-wrap justify-center gap-x-2 text-3xl font-bold capitalize tracking-tight sm:gap-x-3 sm:text-[1.75rem]"
                    organizationClassName="text-muted-foreground mt-1 max-w-[20rem] text-center text-sm font-medium leading-snug"
                    jobTitleClassName="mt-1.5 text-center text-xs font-semibold uppercase tracking-[0.18em]"
                    jobTitleStyle={{ color: banner_color }}
                />

                {headline?.trim() ? (
                    <blockquote
                        className="mt-5 py-0 pl-3.5"
                        style={{ borderLeft: `3px solid ${banner_color}` }}
                    >
                        <p className="text-muted-foreground text-left text-xs leading-relaxed sm:text-[0.8125rem]">
                            {headline}
                        </p>
                    </blockquote>
                ) : null}

                <div className="mt-6 space-y-5">
                    <CardSocialLinks
                        links={links}
                        banner_color={banner_color}
                        variant="outline"
                        className="flex flex-row flex-wrap items-center justify-center gap-3 border-none"
                        iconWrapperClassName="flex h-11 w-11 items-center justify-center rounded-2xl"
                    />
                    <CardContactActions
                        phone={phone}
                        email={email}
                        banner_color={banner_color}
                        variant="bold"
                    />
                </div>

                <div className="mt-6 space-y-5">
                    <CardServicesSection
                        services={services}
                        title="Services"
                        className="border-border/50 rounded-2xl border-0 bg-muted/25 shadow-none dark:bg-muted/15"
                    />
                    <CardGalleriesSection
                        galleries={galleries}
                        title="Gallery"
                        className="border-border/50 rounded-2xl border-0 bg-muted/25 shadow-none dark:bg-muted/15"
                    />
                    <div className="rounded-2xl border border-border/40 bg-muted/15 p-3 dark:bg-muted/10">
                        <CardBusinessHours enabled={business_hours_enabled} business_hours={business_hours} />
                    </div>
                    <CardLocationBlock
                        address={address}
                        location={location}
                        banner_color={banner_color}
                        className="flex flex-col gap-3 rounded-2xl border border-dashed border-border/50 bg-muted/10 p-3 shadow-none dark:bg-muted/5"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
