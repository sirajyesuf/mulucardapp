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
                Template
            </Label>
            <Select value={value} onValueChange={(next) => onChange(next as CardTemplateId)} disabled={disabled}>
                <SelectTrigger
                    id={selectId}
                    className="h-9 w-full min-w-0 border-border bg-background text-foreground shadow-xs sm:max-w-[240px]"
                    aria-label="Card template"
                >
                    <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent
                    align="start"
                    className="min-w-[var(--radix-select-trigger-width)] border-border shadow-md ring-1 ring-black/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)] dark:ring-white/10"
                >
                    {CARD_TEMPLATE_OPTIONS.map((opt) => (
                        <SelectItem
                            key={opt.id}
                            value={opt.id}
                            title={opt.description}
                            textValue={opt.description ? `${opt.label} — ${opt.description}` : opt.label}
                            className="text-popover-foreground focus:bg-muted focus:text-foreground dark:focus:bg-muted/80"
                        >
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
