type CardContactActionsProps = {
    phone: string;
    email: string;
    banner_color: string;
    className?: string;
    buttonClassName?: string;
};

export function CardContactActions({
    phone,
    email,
    banner_color,
    className = 'flex w-full flex-col gap-4 border-none p-2 text-center font-bold capitalize text-white',
    buttonClassName = 'rounded-4xl border-none p-2',
}: CardContactActionsProps) {
    return (
        <div className={className}>
            {phone && (
                <div className={buttonClassName} style={{ backgroundColor: banner_color }}>
                    <a href={`tel:${phone}`}>call me</a>
                </div>
            )}
            {email && (
                <div className={buttonClassName} style={{ backgroundColor: banner_color }}>
                    <a href={`mailto:${email}`}>email me</a>
                </div>
            )}
        </div>
    );
}
