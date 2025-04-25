import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import  {router, usePage } from '@inertiajs/react';
import { SharedData } from "@/types"
import { usePoll } from '@inertiajs/react'


export default function NotificationPanel() {
  // usePoll(10000)
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const unReadNotifications  = auth.unReadNotifications
  const unreadCount =  unReadNotifications.length
  const [expandedId, setExpandedId] = useState<string | null>(null)


  const removeNotification = (id: string) => {
    router.post(route('dashboard.marknotificationasread', { id:id }))
  }

  const markAllAsRead = () => {

    const notificationIds = unReadNotifications.map(notification => notification.id)
    router.post(route('dashboard.markallasread'), {
      notificationsIds: notificationIds
    })

  }

  const toggleNotification = (id: string) => {
    setExpandedId(expandedId === id ? null : id)

  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription className="flex justify-between items-center">
            <span>You have {unreadCount} notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={() => markAllAsRead()}>
                Mark all as read
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-4 max-h-[80vh] overflow-y-auto pr-2">
          {unreadCount > 0 ? (
            unReadNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 border rounded-lg ${notification.read_at ? "bg-background" : "bg-muted"} transition-all`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeNotification(notification.id)
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
                <div className="pr-6 cursor-pointer" onClick={() => toggleNotification(notification.id)}>
                  <h4 className="font-medium">{notification.data.subject}</h4>
                  {/* <p className="text-sm text-muted-foreground mt-1">{notification.data.body}</p> */}
                  <p className="text-xs text-muted-foreground mt-2">{notification.created_at}</p>

                  {expandedId === notification.id && (
                    <div className="mt-4 pt-4 border-t text-sm animate-in fade-in-50 duration-200">
                      <p>{notification.data.body}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No notifications</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
