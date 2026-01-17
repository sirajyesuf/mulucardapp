import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface DoughnutChartProps {
    activeCards: number;
    inactiveCards: number;
}

export default function DoughnutChart({ activeCards, inactiveCards }: DoughnutChartProps) {
    const data = [
        { name: 'Active', value: activeCards, color: '#22c55e' },
        { name: 'Inactive', value: inactiveCards, color: '#ef4444' },
    ];

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
