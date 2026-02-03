
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    handler: async (ctx) => {
        return await ctx.db.query("bankAccounts").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        bankName: v.string(),
        accountName: v.string(),
        accountNumber: v.string(),
        routingNumber: v.string(),
        bankAddress: v.string(),
        accountType: v.string(),
        currency: v.string(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        return await ctx.db.insert("bankAccounts", {
            ...args,
            isActive: true, // Default to active
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("bankAccounts"),
        bankName: v.optional(v.string()),
        accountName: v.optional(v.string()),
        accountNumber: v.optional(v.string()),
        routingNumber: v.optional(v.string()),
        bankAddress: v.optional(v.string()),
        accountType: v.optional(v.string()),
        currency: v.optional(v.string()),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        return await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("bankAccounts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getActive = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("bankAccounts")
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});
