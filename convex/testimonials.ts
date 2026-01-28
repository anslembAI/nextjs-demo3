import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Queries
export const list = query({
  args: { featured: v.optional(v.boolean()), destinationId: v.optional(v.id("destinations")) },
  handler: async (ctx, args) => {
    if (args.featured !== undefined) {
      return await ctx.db
        .query("testimonials")
        .withIndex("by_featured", (q) => q.eq("featured", args.featured!))
        .collect();
    } else if (args.destinationId !== undefined) {
      return await ctx.db
        .query("testimonials")
        .withIndex("by_destinationId", (q) => q.eq("destinationId", args.destinationId!))
        .collect();
    }

    return await ctx.db.query("testimonials").collect();
  },
});

export const getById = query({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByRating = query({
  args: { minRating: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const testimonials = await ctx.db.query("testimonials").collect();
    if (args.minRating !== undefined) {
      return testimonials.filter((t) => t.rating >= args.minRating!);
    }
    return testimonials;
  },
});

// Mutations
export const create = mutation({
  args: {
    userId: v.id("users"),
    destinationId: v.optional(v.id("destinations")),
    userName: v.string(),
    userImage: v.optional(v.string()),
    rating: v.number(),
    comment: v.string(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("testimonials", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("testimonials"),
    userName: v.optional(v.string()),
    userImage: v.optional(v.string()),
    rating: v.optional(v.number()),
    comment: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Testimonial not found");
    }
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
