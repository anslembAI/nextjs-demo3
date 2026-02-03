"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    LayoutDashboard,
    Settings,
    TrendingUp,
    DollarSign,
    Calendar,
    MoreHorizontal,
    Search,
    Bell
} from "lucide-react";
import Image from "next/image";

// Mock Data
const users = [
    {
        id: 1,
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        role: "Admin",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=1",
        lastActive: "2 mins ago"
    },
    {
        id: 2,
        name: "Sarah Connors",
        email: "sarah.c@example.com",
        role: "User",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=2",
        lastActive: "1 hour ago"
    },
    {
        id: 3,
        name: "Michael Chen",
        email: "m.chen@example.com",
        role: "Agent",
        status: "Offline",
        avatar: "https://i.pravatar.cc/150?u=3",
        lastActive: "2 days ago"
    },
    {
        id: 4,
        name: "Jessica Wu",
        email: "jess.wu@example.com",
        role: "User",
        status: "Suspended",
        avatar: "https://i.pravatar.cc/150?u=4",
        lastActive: "1 week ago"
    },
    {
        id: 5,
        name: "David Miller",
        email: "d.miller@example.com",
        role: "User",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=5",
        lastActive: "5 mins ago"
    },
];

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1% from last month",
        icon: DollarSign,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
    {
        title: "Active Users",
        value: "+2350",
        change: "+180.1% from last month",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        title: "Bookings",
        value: "+12,234",
        change: "+19% from last month",
        icon: Calendar,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        title: "Active Now",
        value: "+573",
        change: "+201 since last hour",
        icon: TrendingUp,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10"
    },
];

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "users">("dashboard");

    return (
        <div className="min-h-screen bg-surface-2/50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Portal</h1>
                        <p className="text-muted-foreground">Manage your application, users, and data.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-10 w-64 rounded-xl border border-input bg-background pl-9 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <button className="relative rounded-full bg-background p-2 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors border border-border">
                            <Bell className="h-5 w-5" />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                        </button>
                        <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-background">
                            <Image
                                src="https://i.pravatar.cc/150?u=admin"
                                alt="Admin"
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Navigation Tabs */}
                <div className="mb-8 flex space-x-1 rounded-xl bg-muted/50 p-1 w-fit">
                    <button
                        onClick={() => setActiveTab("dashboard")}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === "dashboard"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                            }`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === "users"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                            }`}
                    >
                        <Users className="h-4 w-4" />
                        Users
                    </button>
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "dashboard" ? (
                        <DashboardContent />
                    ) : (
                        <UsersContent />
                    )}
                </motion.div>
            </div>
        </div>
    );
}

function DashboardContent() {
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
                        {/* Decorative background element */}
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
                            <option>Last Month</option>
                            <option>This Year</option>
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
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center">
                                <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                                    <div className="h-2 w-2 rounded-full bg-accent" />
                                </div>
                                <div className="ml-0 space-y-1">
                                    <p className="text-sm font-medium leading-none text-foreground">New user registered</p>
                                    <p className="text-xs text-muted-foreground">
                                        Jackson Lee joined 2 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-xs text-muted-foreground">+$0.00</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersContent() {
    return (
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50">
                <div>
                    <h2 className="text-lg font-semibold text-foreground">All Users</h2>
                    <p className="text-sm text-muted-foreground">Manage your team members and their account permissions here.</p>
                </div>
                <button className="btn btn--primary">
                    <Users className="h-4 w-4" />
                    Add User
                </button>
            </div>
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                User
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Role
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Status
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Last Active
                            </th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ml-2"
                            >
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 overflow-hidden rounded-full border border-border">
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                width={40}
                                                height={40}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                    <div className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                                        {user.role}
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold
                    ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''}
                    ${user.status === 'Offline' ? 'bg-gray-500/10 text-gray-600 dark:text-gray-400' : ''}
                    ${user.status === 'Suspended' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : ''}
                  `}>
                                        <span className={`h-1.5 w-1.5 rounded-full 
                        ${user.status === 'Active' ? 'bg-emerald-500' : ''}
                        ${user.status === 'Offline' ? 'bg-gray-500' : ''}
                        ${user.status === 'Suspended' ? 'bg-red-500' : ''}
                    `}></span>
                                        {user.status}
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                                    {user.lastActive}
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                    <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
