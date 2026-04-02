import type { ComponentType } from 'react';
import type { CardTemplateId, MuluCardProps } from '@/pages/card/mulu-card-props';
import { BoldCardTemplate } from '@/pages/card/templates/bold';
import { ClassicCardTemplate } from '@/pages/card/templates/classic';
import { ModernCardTemplate } from '@/pages/card/templates/modern';

export const CARD_TEMPLATES: Record<CardTemplateId, ComponentType<MuluCardProps>> = {
    classic: ClassicCardTemplate,
    modern: ModernCardTemplate,
    bold: BoldCardTemplate,
};

export function getCardTemplate(id: string | undefined): ComponentType<MuluCardProps> {
    if (id && id in CARD_TEMPLATES) {
        return CARD_TEMPLATES[id as CardTemplateId];
    }
    return ClassicCardTemplate;
}
