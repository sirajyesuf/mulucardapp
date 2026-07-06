type CardHeadlineProps = {
    headline: string;
    className?: string;
};

export function CardHeadline({ headline, className = 'text-muted-foreground p-2 text-center' }: CardHeadlineProps) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: headline }} />;
}
