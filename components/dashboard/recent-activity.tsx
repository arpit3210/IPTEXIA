import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "register",
      title: "Digital Artwork #42",
      time: "2 hours ago",
      user: "You",
      initials: "YO",
    },
    {
      id: 2,
      type: "license",
      title: "Music Track 'Ethereal'",
      time: "1 day ago",
      user: "0x1a2...3b4c",
      initials: "1A",
    },
    {
      id: 3,
      type: "violation",
      title: "Logo Design",
      time: "3 days ago",
      user: "System",
      initials: "SY",
    },
    {
      id: 4,
      type: "royalty",
      title: "E-book 'Web3 Basics'",
      time: "1 week ago",
      user: "0x5d6...7e8f",
      initials: "5D",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "register":
        return "🆕"
      case "license":
        return "📄"
      case "violation":
        return "⚠️"
      case "royalty":
        return "💰"
      default:
        return "📌"
    }
  }

  const getActivityText = (type: string, title: string, user: string) => {
    switch (type) {
      case "register":
        return `${user} registered "${title}"`
      case "license":
        return `${user} licensed "${title}"`
      case "violation":
        return `Potential violation detected for "${title}"`
      case "royalty":
        return `Royalty payment received for "${title}"`
      default:
        return `Activity related to "${title}"`
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {getActivityIcon(activity.type)} {getActivityText(activity.type, activity.title, activity.user)}
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

