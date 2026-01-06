"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle,
  Clock,
  Command,
  Frame,
  GalleryVerticalEnd,
  Layers,
  LayoutDashboard,
  Map,
  MapPin,
  Package,
  PieChart,
  Settings2,
  SquareTerminal,
  XCircle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "/admin/products",
      icon: Package,
    },
    {
      title: "Categories",
      url: "/admin/category",
      icon: Layers,
    },
    {
      title: "Locations",
      url: "/admin/location",
      icon: MapPin,
    },
    {
      title: "Sales",
      url: "/admin/sales",
      icon: BadgeDollarSign,
    },
    {
      title: "Pending",
      url: "/admin/pending",
      icon: Clock,
    },
    {
      title: "Active",
      url: "/admin/active",
      icon: CheckCircle,
    },
    {
      title: "Rejected",
      url: "/admin/rejected",
      icon: XCircle,
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: BarChart3,
    }
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: Package,
    },
    {
      name: "Categories",
      url: "/admin/category",
      icon: Layers,
    },
    {
      name: "Locations",
      url: "/admin/location",
      icon: MapPin,
    },
    {
      name: "Sales",
      url: "/admin/sales",
      icon: BadgeDollarSign,
    },
    {
      name: "Pending",
      url: "/admin/pending",
      icon: Clock,
    },
    {
      name: "Active",
      url: "/admin/active",
      icon: CheckCircle,
    },
    {
      name: "Rejected",
      url: "/admin/rejected",
      icon: XCircle,
    },
    {
      name: "Reports",
      url: "/admin/reports",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
