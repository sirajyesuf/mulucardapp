import BusinessHoursPreview from '@/components/business-hours';
import type { DaySchedule } from '@/types';

type CardBusinessHoursProps = {
    enabled: boolean;
    business_hours: DaySchedule[] | null;
};

export function CardBusinessHours({ enabled, business_hours }: CardBusinessHoursProps) {
    if (!enabled) {
        return null;
    }
    return <BusinessHoursPreview business_hours={business_hours} />;
}
