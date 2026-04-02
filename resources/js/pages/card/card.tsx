import type { CardTemplateId, MuluCardProps } from '@/pages/card/mulu-card-props';
import { getCardTemplate } from '@/pages/card/templates/registry';

export type { CardTemplateId, MuluCardProps } from '@/pages/card/mulu-card-props';

type MuluCardComponentProps = MuluCardProps & {
    template?: CardTemplateId;
};

export default function MuluCard({ template = 'classic', ...props }: MuluCardComponentProps) {
    const Template = getCardTemplate(template);
    return <Template {...props} />;
}
