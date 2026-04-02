import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Image } from '@/types';
import { Copy, Download, Edit, Eye, Globe, MoreHorizontal, Trash2 } from 'lucide-react';

interface CardPreviewProps {
    banner: Image;
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    banner_color: string;
    onShowCardDetail: () => void;
    onDelete: () => void;
    onCopyLink: () => void;
    onDownloadQR: () => void;
    onEdit: () => void;
    onHelloCard: () => void;
}

export default function CardPreview({
    banner,
    avatar,
    logo,
    first_name,
    last_name,
    banner_color,
    onShowCardDetail,
    onDelete,
    onCopyLink,
    onDownloadQR,
    onHelloCard,
    onEdit,
}: CardPreviewProps) {
    const hexOk = /^#[0-9A-Fa-f]{6}$/i.test(banner_color);
    const brandBannerStyle =
        !banner.path && hexOk
            ? ({
                  background: `linear-gradient(135deg, ${banner_color}55, ${banner_color}2e, ${banner_color}40)`,
              } as React.CSSProperties)
            : undefined;

    const stripStyle = hexOk ? ({ backgroundColor: banner_color } as React.CSSProperties) : undefined;

    return (
        <Card className="group bg-card relative flex w-full flex-col gap-0 overflow-hidden rounded-2xl border-0 py-0 shadow-sm ring-1 ring-border/50 transition-[transform,box-shadow,ring-color] hover:-translate-y-1 hover:shadow-lg hover:ring-border dark:ring-border/40 dark:hover:ring-border">
            {/* Brand accent */}
            <div
                className={cn('h-1.5 w-full shrink-0', !hexOk && 'bg-primary')}
                style={stripStyle}
                aria-hidden
            />

            {/* Media */}
            <div className="relative">
                {banner.path ? (
                    <div className="relative h-[7.25rem] w-full">
                        <img src={banner.path} alt="" className="h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                    </div>
                ) : (
                    <div
                        className="h-20 w-full bg-gradient-to-br from-muted/80 via-muted/50 to-muted/80 dark:from-muted/35 dark:via-muted/20 dark:to-muted/35"
                        style={brandBannerStyle}
                    />
                )}
            </div>

            {/* Identity block */}
            <div className="relative -mt-9 px-4 pb-1">
                <div className="flex items-end justify-between gap-3">
                    <div className="ring-background bg-background h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl shadow-md ring-4">
                        {avatar.path ? (
                            <img src={avatar.path} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <div className="bg-muted flex h-full w-full items-center justify-center">
                                <svg className="text-muted-foreground h-9 w-9" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    {logo.path ? (
                        <div className="border-border/60 bg-background mb-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border shadow-sm">
                            <img src={logo.path} alt="" className="h-full w-full object-contain p-1" />
                        </div>
                    ) : null}
                </div>

                <div className="mt-3 space-y-0.5">
                    <h3
                        className="text-foreground cursor-pointer text-left text-base font-semibold leading-snug tracking-tight hover:underline"
                        title="View card details"
                        role="button"
                        tabIndex={0}
                        onClick={onShowCardDetail}
                        onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onShowCardDetail();
                            }
                        }}
                    >
                        {first_name} {last_name}
                    </h3>
                    <p className="text-muted-foreground text-left text-xs font-medium">Digital business card</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="border-border/50 bg-muted/25 mt-3 flex flex-wrap items-center justify-center gap-1 border-t px-2 py-2.5 dark:bg-muted/15">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 shrink-0 rounded-lg p-0"
                    title="Open public card"
                    aria-label="Open public card"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onHelloCard();
                    }}
                >
                    <Globe className="h-4 w-4" />
                </Button>
                {onEdit ? (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 shrink-0 rounded-lg p-0"
                        title="Edit card"
                        aria-label="Edit card"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                ) : null}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 shrink-0 rounded-lg p-0"
                    title="View card details"
                    aria-label="View card details"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onShowCardDetail();
                    }}
                >
                    <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-9 w-9 shrink-0 rounded-lg p-0"
                            title="More actions"
                            aria-label="More actions"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {onDelete ? (
                            <DropdownMenuItem
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Card
                            </DropdownMenuItem>
                        ) : null}
                        {onCopyLink ? (
                            <DropdownMenuItem
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    onCopyLink();
                                }}
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Link
                            </DropdownMenuItem>
                        ) : null}
                        {onDownloadQR ? (
                            <DropdownMenuItem
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    onDownloadQR();
                                }}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download QR Code
                            </DropdownMenuItem>
                        ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
}
