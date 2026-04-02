import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

type CardIdentityProps = {
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    className?: string;
    nameClassName?: string;
    /** Applied to organization and job title lines when org/job overrides are not set */
    detailLineClassName?: string;
    organizationClassName?: string;
    jobTitleClassName?: string;
    jobTitleStyle?: CSSProperties;
};

export function CardIdentity({
    first_name,
    last_name,
    organization,
    job_title,
    className = 'mb-8 flex flex-col items-center border-none',
    nameClassName = 'font-norma text-foreground flex flex-row space-x-4 text-2xl capitalize',
    detailLineClassName,
    organizationClassName,
    jobTitleClassName,
    jobTitleStyle,
}: CardIdentityProps) {
    const lineClass = cn('text-md text-card-foreground font-bold capitalize', detailLineClassName);
    const orgClass = organizationClassName ?? lineClass;
    const jobClass = jobTitleClassName ?? lineClass;

    return (
        <div className={className}>
            <div className={nameClassName}>
                <p>{first_name}</p>
                <p>{last_name}</p>
            </div>
            <div>
                <p className={orgClass}>{organization}</p>
                <p className={jobClass} style={jobTitleStyle}>
                    {job_title}
                </p>
            </div>
        </div>
    );
}
