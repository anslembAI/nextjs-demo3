
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// One-off migration script to set admin role
export const setAdminRole = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (!user) {
            throw new Error(`User with email ${args.email} not found`);
        }

        await ctx.db.patch(user._id, {
            role: "Admin",
            updatedAt: Date.now(),
        });

        return { success: true, message: `Updated ${user.name} to Admin` };
    },
});

export const performAdminSetup = mutation({
    args: {},
    handler: async (ctx) => {
        const adminEmails = ["anslemb7615@outlook.com", "quantumforceexclusive@gmail.com"];
        const mockEmails = ["sarah@example.com", "michael@example.com", "emily@example.com"];

        const results = [];

        // Set Admins
        for (const email of adminEmails) {
            const user = await ctx.db
                .query("users")
                .withIndex("by_email", (q) => q.eq("email", email))
                .first();

            if (user) {
                await ctx.db.patch(user._id, {
                    role: "Admin",
                    updatedAt: Date.now(),
                });
                results.push(`Set ${email} to Admin`);
            } else {
                results.push(`User ${email} not found`);
            }
        }

        // Remove Mock Users
        for (const email of mockEmails) {
            const user = await ctx.db
                .query("users")
                .withIndex("by_email", (q) => q.eq("email", email))
                .first();

            if (user) {
                await ctx.db.delete(user._id);
                results.push(`Deleted mock user ${email}`);
            }
        }

        return { success: true, results };
    },
});
