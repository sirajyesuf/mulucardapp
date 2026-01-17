import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface TopViewedCard {
    id: number;
    first_name: string;
    last_name: string;
    total_views: number;
}

interface BarChartProps {
    cards: TopViewedCard[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export default function TopViewedChart({ cards }: BarChartProps) {
    const data = cards.map((card, index) => ({
        name: `${card.first_name} ${card.last_name}`,
        views: card.total_views,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
