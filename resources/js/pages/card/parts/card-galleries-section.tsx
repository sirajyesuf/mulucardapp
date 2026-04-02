import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Gallery } from '@/types';

type CardGalleriesSectionProps = {
    galleries: Gallery[];
    className?: string;
    title?: string;
};

export function CardGalleriesSection({ galleries, className = 'border-none shadow-none', title = 'Galleries' }: CardGalleriesSectionProps) {
    if (galleries.length === 0) {
        return null;
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {galleries.map((item) => (
                        <div key={item.id} className="space-y-2">
                            <div className="bg-card aspect-video w-full overflow-hidden rounded-lg border">
                                {item.path && <img src={item.path} alt={item.description} className="h-full w-full object-contain" />}
                            </div>
                            <div className="mt-2">
                                <p className="text-muted-foreground mt-1 text-sm">{item.description || 'No description provided'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
