
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function DashboardContent() {
    const statsData = useQuery(api.admin.getDashboardStats);

    // If loading, show skeletons or return null
    if (!statsData) {
        return <div className="p-8 text-center text-muted-foreground">Loading stats...</div>;
    }

    const { revenue, totalUsers, totalBookings, activeUsers, recentActivity } = statsData;

    const stats = [
        {
            title: "Total Revenue",
            value: `$${revenue.toLocaleString()}`,
            change: "Lifetime", // Dynamic change logic requires history
            icon: DollarSign,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10"
        },
        {
            title: "Total Users",
            value: totalUsers,
            change: `${activeUsers} active recently`,
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            title: "Bookings",
            value: totalBookings,
            change: "All time",
            icon: Calendar,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            title: "Active Now",
            value: activeUsers,
            change: "In last 24h",
            icon: TrendingUp,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10"
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <div key={i} className="card relative overflow-hidden bg-card p-6 border-border/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                        {stat.value}
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
                            </div>
                            <div className={`rounded-xl p-3 ${stat.bgColor} ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.bgColor} opacity-20 blur-2xl`} />
                    </div>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Chart Area (Placeholder) */}
                <div className="col-span-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Overview</h3>
                        <select className="bg-transparent text-sm text-muted-foreground outline-none">
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="flex h-[300px] items-center justify-center rounded-xl bg-surface-2/30 border border-dashed border-border">
                        <div className="text-center">
                            <TrendingUp className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground">Revenue Chart Placeholder</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-span-3 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
                    <div className="space-y-8">
                        {recentActivity.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No recent activity.</p>
                        ) : (
                            recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                                        <div className="h-2 w-2 rounded-full bg-accent" />
                                    </div>
                                    <div className="ml-0 space-y-1">
                                        <p className="text-sm font-medium leading-none text-foreground">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.user} • {formatDistanceToNow(activity.time, { addSuffix: true })}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                                        {activity.amount ? `$${activity.amount}` : ""}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
