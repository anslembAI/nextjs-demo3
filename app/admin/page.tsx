
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    LayoutDashboard,
    Search,
    Bell,
    FileText,
    Settings as SettingsIcon,
} from "lucide-react";
import { InvoicesView } from "@/components/admin/InvoicesView";
import { SettingsView } from "@/components/admin/SettingsView";
import { DashboardContent } from "@/components/admin/DashboardContent";
import { UsersContent } from "@/components/admin/UsersContent";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "invoices" | "settings">("dashboard");
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user || user.role?.toLowerCase() !== "admin") {
                router.push("/404");
            }
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-2/50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || user.role?.toLowerCase() !== "admin") {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="min-h-screen bg-surface-2/50 p-4 md:p-8 pt-32">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Portal</h1>
                        <p className="text-muted-foreground">Manage your application, users, and data.</p>
                    </div>
                    {/* ... (Keep existing header search/profile section if desired, or simplify) ... */}
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
                <div className="mb-8 flex space-x-1 rounded-xl bg-muted/50 p-1 w-fit overflow-x-auto">
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
                    <button
                        onClick={() => setActiveTab("invoices")}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === "invoices"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                            }`}
                    >
                        <FileText className="h-4 w-4" />
                        Invoices
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === "settings"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                            }`}
                    >
                        <SettingsIcon className="h-4 w-4" />
                        Settings
                    </button>
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "dashboard" && <DashboardContent />}
                    {activeTab === "users" && <UsersContent />}
                    {activeTab === "invoices" && <InvoicesView />}
                    {activeTab === "settings" && <SettingsView />}
                </motion.div>
            </div>
        </div>
    );
}
