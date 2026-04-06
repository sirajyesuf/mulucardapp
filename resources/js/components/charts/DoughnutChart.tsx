import { CheckCircle2, CircleOff } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface DoughnutChartProps {
    activeCards: number;
    inactiveCards: number;
}

export default function DoughnutChart({ activeCards, inactiveCards }: DoughnutChartProps) {
    const totalCards = activeCards + inactiveCards;
    const data = [
        { name: 'Active', value: activeCards, color: '#22c55e' },
        { name: 'Inactive', value: inactiveCards, color: '#ef4444' },
    ];
    const segments = [
        {
            name: 'Active',
            value: activeCards,
            color: '#22c55e',
            textColor: 'text-emerald-600 dark:text-emerald-400',
            bgColor: 'bg-emerald-500',
            icon: CheckCircle2,
        },
        {
            name: 'Inactive',
            value: inactiveCards,
            color: '#ef4444',
            textColor: 'text-rose-600 dark:text-rose-400',
            bgColor: 'bg-rose-500',
            icon: CircleOff,
        },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
                <div className="relative mx-auto h-44 w-full max-w-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={72} paddingAngle={4} dataKey="value" stroke="none">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalCards}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">total cards</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {segments.map((segment) => {
                        const Icon = segment.icon;
                        const percentage = totalCards === 0 ? 0 : Math.round((segment.value / totalCards) * 100);

                        return (
                            <div
                                key={segment.name}
                                className="rounded-xl border border-slate-200/70 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/60"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${segment.bgColor}`}>
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{segment.name}</p>
                                            <p className={`text-xs ${segment.textColor}`}>{percentage}% of cards</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{segment.value}</p>
                                </div>

                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${Math.max(percentage, segment.value > 0 ? 8 : 0)}%`,
                                            backgroundColor: segment.color,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
