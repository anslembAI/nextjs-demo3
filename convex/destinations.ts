import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Queries
export const list = query({
  args: { featured: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    if (args.featured !== undefined) {
      const destinations = await ctx.db
        .query("destinations")
        .withIndex("by_featured", (q) => q.eq("featured", args.featured!))
        .collect();
      return destinations;
    }

    return await ctx.db.query("destinations").collect();
  },
});

export const getById = query({
  args: { id: v.id("destinations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const destinations = await ctx.db.query("destinations").collect();
    return destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(args.query.toLowerCase()) ||
        destination.location.toLowerCase().includes(args.query.toLowerCase()) ||
        destination.tags.some((tag: string) =>
          tag.toLowerCase().includes(args.query.toLowerCase())
        )
    );
  },
});

// Mutations
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    location: v.string(),
    imageUrl: v.string(),
    price: v.number(),
    duration: v.string(),
    rating: v.number(),
    featured: v.boolean(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("destinations", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("destinations"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    price: v.optional(v.number()),
    duration: v.optional(v.string()),
    rating: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Destination not found");
    }
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("destinations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
