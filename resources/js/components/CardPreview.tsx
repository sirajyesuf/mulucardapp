import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Image } from '@/types';
import { Copy, Download, Edit, MoreHorizontal, Trash2 } from 'lucide-react';

interface CardPreviewProps {
    banner: Image;
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    banner_color: string;
    onClick?: () => void;
    onDelete?: () => void;
    onCopyLink?: () => void;
    onDownloadQR?: () => void;
    onEdit?: () => void;
}

export default function CardPreview({
    banner,
    avatar,
    logo,
    first_name,
    last_name,
    banner_color,
    onClick,
    onDelete,
    onCopyLink,
    onDownloadQR,
    onEdit,
}: CardPreviewProps) {
    return (
        <Card className="group bg-card relative w-full overflow-hidden border">
            {/* Banner with gradient overlay */}
            <div className="relative">
                {banner.path ? (
                    <div className="relative h-32 w-full">
                        <img src={banner.path} alt="Banner" className="h-full w-full object-cover" />
                    </div>
                ) : (
                    <div className="h-16 w-full" />
                )}

                {/* Quick Actions */}
                <div className="absolute top-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 w-8 rounded-full p-0"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            {onDelete && (
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
                            )}
                            {onCopyLink && (
                                <DropdownMenuItem
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        onCopyLink();
                                    }}
                                >
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy Link
                                </DropdownMenuItem>
                            )}
                            {onDownloadQR && (
                                <DropdownMenuItem
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        onDownloadQR();
                                    }}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download QR Code
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Avatar and Logo */}
            <div className="relative px-4 pb-4">
                <div className={`${banner.path ? '-mt-12' : ''} flex items-end justify-between`}>
                    {/* Avatar */}
                    <div className="relative">
                        <div className="border-background bg-background h-16 w-16 rounded-full border-4">
                            {avatar.path ? (
                                <img src={avatar.path} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                            ) : (
                                <div className="bg-muted flex h-full w-full items-center justify-center">
                                    <svg className="text-muted-foreground h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Logo */}
                    {logo.path && (
                        <div className="border-background bg-background h-12 w-12 rounded-lg border-2">
                            <img src={logo.path} alt="Logo" className="h-full w-full rounded-lg object-contain p-1" />
                        </div>
                    )}
                </div>

                {/* Name */}
                <div className="mt-3 text-center">
                    <h3 className="text-foreground cursor-pointer text-lg font-semibold" onClick={onClick}>
                        {first_name} {last_name}
                    </h3>
                </div>
            </div>

            {/* Floating Edit Button */}
            {onEdit && (
                <div className="absolute right-2 bottom-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-primary text-primary-foreground h-10 w-10 rounded-full p-0"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </Card>
    );
}
