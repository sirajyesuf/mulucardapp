import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function BusinessHoursPreview({ bussiness_hours }: { bussiness_hours: DaySchedule[] }) {
    console.log('BusinessHoursPreview');
    console.log(bussiness_hours);
    // Format time from 24h to 12h format
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    // Group days with identical schedules
    const groupedSchedule = () => {
        if (!bussiness_hours) return []; // Add simple undefined check

        const groups: { days: string[]; schedule: string }[] = [];
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        daysOfWeek.forEach((day) => {
            const daySchedule = bussiness_hours.find((schedule) => schedule.day === day);
            const scheduleString = getScheduleString(daySchedule);

            const existingGroup = groups.find((group) => group.schedule === scheduleString);
            if (existingGroup) {
                existingGroup.days.push(day);
            } else {
                groups.push({ days: [day], schedule: scheduleString });
            }
        });

        return groups;
    };

    // Get a string representation of a day's schedule
    const getScheduleString = (daySchedule?: DaySchedule) => {
        if (!daySchedule || daySchedule.isOpen == '0') return 'Closed';
        return `${daySchedule.open}-${daySchedule.close}`;
    };

    // Format days for display (e.g., "Monday, Tuesday" or "Monday - Wednesday")
    const formatDays = (days: string[]) => {
        if (days.length === 1) return days[0];

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const indices = days.map((day) => daysOfWeek.indexOf(day)).sort((a, b) => a - b);

        // Check if days are consecutive
        let isConsecutive = true;
        for (let i = 1; i < indices.length; i++) {
            if (indices[i] !== indices[i - 1] + 1) {
                isConsecutive = false;
                break;
            }
        }

        if (isConsecutive) {
            return `${daysOfWeek[indices[0]]} - ${daysOfWeek[indices[indices.length - 1]]}`;
        } else {
            return days.join(', ');
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Business Hours
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {groupedSchedule().map((group, index) => (
                        <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                            <div className="font-medium">{formatDays(group.days)}</div>
                            <div className="text-muted-foreground">
                                {group.schedule === 'Closed' ? (
                                    'Closed'
                                ) : (
                                    <div className="flex items-center gap-1">
                                        {formatTime(bussiness_hours.find((schedule) => schedule.day === group.days[0])!.open)} -{' '}
                                        {formatTime(bussiness_hours.find((schedule) => schedule.day === group.days[0])!.close)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}