import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/types';

type CardServicesSectionProps = {
    services: Service[];
    className?: string;
    title?: string;
};

export function CardServicesSection({ services, className = 'border-none shadow-none', title = 'Our Services' }: CardServicesSectionProps) {
    if (services.length === 0) {
        return null;
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {services.map((item) => (
                        <div key={item.id} className="space-y-2">
                            <div className="bg-card aspect-video w-full overflow-hidden rounded-lg border">
                                {item.path && <img src={item.path} alt={item.name} className="h-full w-full object-contain" />}
                            </div>
                            <div className="mt-2">
                                <h3 className="text-foreground font-medium">{item.name}</h3>
                                <p className="text-muted-foreground mt-1 text-sm">{item.description || 'No description provided'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
