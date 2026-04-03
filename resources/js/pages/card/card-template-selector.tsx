import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CARD_TEMPLATE_OPTIONS, type CardTemplateId } from '@/pages/card/mulu-card-props';
import { cn } from '@/lib/utils';
import { useId } from 'react';

export type CardTemplateSelectorProps = {
    value: CardTemplateId;
    onChange: (id: CardTemplateId) => void;
    disabled?: boolean;
    className?: string;
};

export function CardTemplateSelector({ value, onChange, disabled, className }: CardTemplateSelectorProps) {
    const selectId = useId();

    return (
        <div className={cn('flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3', className)}>
            <Label htmlFor={selectId} className="text-muted-foreground shrink-0 text-xs font-medium sm:pt-0.5 sm:text-sm">
                Preview layout
            </Label>
            <Select value={value} onValueChange={(next) => onChange(next as CardTemplateId)} disabled={disabled}>
                <SelectTrigger
                    id={selectId}
                    className="h-9 w-full min-w-0 sm:max-w-[240px]"
                    aria-label="Card preview layout"
                >
                    <SelectValue placeholder="Choose layout" />
                </SelectTrigger>
                <SelectContent align="start" className="min-w-[var(--radix-select-trigger-width)]">
                    {CARD_TEMPLATE_OPTIONS.map((opt) => (
                        <SelectItem
                            key={opt.id}
                            value={opt.id}
                            title={opt.description}
                            textValue={opt.description ? `${opt.label} — ${opt.description}` : opt.label}
                        >
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
