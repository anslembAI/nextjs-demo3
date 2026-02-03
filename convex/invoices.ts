
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    handler: async (ctx) => {
        // Fetch all invoices
        const invoices = await ctx.db.query("invoices").order("desc").collect();

        // Enrich with user details
        const invoicesWithUser = await Promise.all(
            invoices.map(async (invoice) => {
                const user = await ctx.db.get(invoice.userId);
                return {
                    ...invoice,
                    userName: user ? user.name : "Unknown User",
                    userEmail: user ? user.email : "Unknown Email",
                };
            })
        );

        return invoicesWithUser;
    },
});

export const create = mutation({
    args: {
        userId: v.id("users"),
        items: v.array(
            v.object({
                description: v.string(),
                quantity: v.number(),
                price: v.number(),
            })
        ),
        currency: v.string(),
        conversionRate: v.number(),
        notes: v.optional(v.string()),
        dueDate: v.number(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();

        // Generate Invoice ID: YYYYMMDD-SEQUENCE
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const datePrefix = `${year}${month}${day}`;

        // Find last invoice created today to increment sequence
        // This is a simplistic approach; for high volume, atomic counters are better.
        // We'll search for invoices starting with this prefix.
        const todayStart = new Date(year, date.getMonth(), date.getDate()).getTime();
        const todaysInvoices = await ctx.db
            .query("invoices")
            .withIndex("by_createdAt", (q) => q.gte("createdAt", todayStart))
            .collect();

        const count = todaysInvoices.length + 1;
        const sequence = String(count).padStart(3, "0");
        const invoiceId = `${datePrefix}-${sequence}`;

        // Calculate Total Amount
        const totalAmount = args.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        return await ctx.db.insert("invoices", {
            invoiceId,
            userId: args.userId,
            items: args.items,
            currency: args.currency,
            conversionRate: args.conversionRate,
            totalAmount,
            notes: args.notes,
            status: "pending",
            dueDate: args.dueDate,
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("invoices"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.id, {
            status: args.status,
            updatedAt: Date.now(),
        });
    },
});

export const getById = query({
    args: { id: v.id("invoices") },
    handler: async (ctx, args) => {
        const invoice = await ctx.db.get(args.id);
        if (!invoice) return null;

        const user = await ctx.db.get(invoice.userId);
        return {
            ...invoice,
            user
        }
    },
});

export const remove = mutation({
    args: { id: v.id("invoices") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
})
