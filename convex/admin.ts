import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDashboardStats = query({
    args: {},
    handler: async (ctx) => {
        // 1. Fetch all bookings for revenue and counts
        const bookings = await ctx.db.query("bookings").collect();
        const users = await ctx.db.query("users").collect();

        // 2. Calculate Total Revenue
        // Assuming totalPrice is in dollars (or consistent currency)
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

        // 3. Calculate "Active Now" (Simulated or based on recent updates)
        // For now, we'll return users active in the last 15 minutes if we had a 'lastActive' field, 
        // but schema says `updatedAt`. Let's use `updatedAt` within last 24h as "Active Recently"
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
        const activeUsersCount = users.filter(u => u.updatedAt > oneDayAgo).length;

        // 4. Get Recent Activity (Last 5 bookings)
        // We need to fetch related user names for these
        const sortedBookings = bookings.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

        const recentActivity = await Promise.all(
            sortedBookings.map(async (b) => {
                const user = await ctx.db.get(b.userId);
                return {
                    id: b._id,
                    description: `New booking (${b.status})`,
                    user: user ? user.name : "Unknown User",
                    time: b.createdAt,
                    amount: b.totalPrice
                };
            })
        );

        return {
            revenue: totalRevenue,
            totalUsers: users.length,
            totalBookings: bookings.length,
            activeUsers: activeUsersCount,
            recentActivity
        };
    },
});
