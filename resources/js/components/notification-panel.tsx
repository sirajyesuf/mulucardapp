import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

type Notification = {
  id: string
  title: string
  description: string
  details: string
  time: string
  read: boolean
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New message",
      description: "You have received a new message from John Doe",
      details:
        "John Doe sent you a message regarding the project proposal. He's asking about the timeline and budget estimates for the next phase. You can reply directly from your inbox.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Payment successful",
      description: "Your payment of $199.00 has been processed successfully",
      details:
        "Transaction ID: TXN123456789. The payment was processed through your saved Visa card ending in 4242. This payment covers your subscription for the next month. A receipt has been sent to your email.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Account update",
      description: "Your account details have been updated",
      details:
        "Your profile information was updated successfully. This includes your new phone number and updated address. If you didn't make these changes, please contact support immediately.",
      time: "5 hours ago",
      read: true,
    },
    {
      id: "4",
      title: "New feature available",
      description: "Check out our new dashboard features",
      details:
        "We've added new analytics tools to your dashboard. Now you can track user engagement, view conversion rates, and export custom reports. Visit the dashboard to explore these new features.",
      time: "1 day ago",
      read: true,
    },
  ])

  const [expandedId, setExpandedId] = useState<string | null>(null)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const toggleNotification = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
    // Mark as read when expanded
    if (expandedId !== id) {
      setNotifications(
        notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    }
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
            <span>You have {notifications.length} notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-4 max-h-[80vh] overflow-y-auto pr-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 border rounded-lg ${notification.read ? "bg-background" : "bg-muted"} transition-all`}
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
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>

                  {expandedId === notification.id && (
                    <div className="mt-4 pt-4 border-t text-sm animate-in fade-in-50 duration-200">
                      <p>{notification.details}</p>
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
