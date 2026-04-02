import { Eye, TrendingUp } from 'lucide-react';

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
        id: card.id,
        rank: index + 1,
        name: `${card.first_name} ${card.last_name}`,
        views: card.total_views,
        fill: COLORS[index % COLORS.length],
    }));
    const maxViews = Math.max(...data.map((entry) => entry.views), 1);

    if (data.length === 0) {
        return (
            <div className="flex h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center dark:border-slate-800 dark:bg-slate-900/60">
                <div className="mb-3 rounded-full bg-white p-3 shadow-sm dark:bg-slate-800">
                    <TrendingUp className="h-5 w-5 text-slate-500" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">No viewing data yet</h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Card performance will appear here once people start opening your cards.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">Leaderboard</p>
                    <h4 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">Most viewed cards</h4>
                </div>
                <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                    <Eye className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </div>
            </div>

            <div className="space-y-3">
                {data.map((entry) => (
                    <div
                        key={entry.id}
                        className="rounded-xl border border-slate-200/70 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/60"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                                    style={{ backgroundColor: entry.fill }}
                                >
                                    {entry.rank}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{entry.name}</p>
                                </div>
                            </div>
                            <div className="shrink-0 text-right">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{entry.views}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">views</p>
                            </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${Math.max((entry.views / maxViews) * 100, 8)}%`,
                                    backgroundColor: entry.fill,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
