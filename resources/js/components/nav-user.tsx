import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { BadgeCheck, ChevronsUpDown } from 'lucide-react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div
                            className={`p-1 ${state === 'collapsed' ? '' : 'rounded-xl border-2 border-sidebar-border/70 bg-sidebar-accent/30'}`}
                        >
                            <SidebarMenuButton size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent">
                                <UserInfo user={auth.user} />
                                <ChevronsUpDown className="ml-auto size-4 opacity-70" />
                            </SidebarMenuButton>
                            {state !== 'collapsed' && (
                                <>
                                    {auth.activePlan && (
                                        <>
                                            <hr className="border-sidebar-border/60" />
                                            <div className="flex flex-row items-center justify-center gap-3 p-1.5">
                                                <BadgeCheck className="size-5 shrink-0 text-primary" aria-hidden />
                                                <p className="text-primary text-sm font-semibold capitalize">
                                                    {auth.activePlan.plan.name} plan
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
