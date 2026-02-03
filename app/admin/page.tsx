"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    LayoutDashboard,
    TrendingUp,
    DollarSign,
    Calendar,
    MoreHorizontal,
    Search,
    Bell,
    Pencil,
    Trash2
} from "lucide-react";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { UserDialog } from "@/components/admin/UserDialog";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "users">("dashboard");

    return (
        <div className="min-h-screen bg-surface-2/50 p-4 md:p-8 pt-24">
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

function UsersContent() {
    const users = useQuery(api.users.list);
    const deleteUser = useMutation(api.users.remove);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleEditUser = (user: any) => {
        setSelectedUser(user);
        setIsUserDialogOpen(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsUserDialogOpen(true);
    };

    const handleDeleteUser = async (userId: any, userName: string) => {
        if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
            try {
                await deleteUser({ id: userId });
            } catch (error) {
                console.error("Failed to delete user:", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    if (!users) {
        return <div className="p-8 text-center text-muted-foreground">Loading users...</div>;
    }

    return (
        <>
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">All Users</h2>
                        <p className="text-sm text-muted-foreground">Manage your team members and their account permissions here.</p>
                    </div>
                    <button className="btn btn--primary" onClick={handleAddUser}>
                        <Users className="h-4 w-4" />
                        Add User
                    </button>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ml-2"
                                >
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                                                {user.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-muted-foreground font-bold">
                                                        {user.name?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ${user.role === 'Admin' ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                                            }`}>
                                            {user.role || "User"}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                            Active
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">
                                        {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                                onClick={() => handleEditUser(user)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                                                onClick={() => handleDeleteUser(user._id, user.name)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserDialog
                isOpen={isUserDialogOpen}
                onClose={() => setIsUserDialogOpen(false)}
                userToEdit={selectedUser}
            />
        </>
    );
}

