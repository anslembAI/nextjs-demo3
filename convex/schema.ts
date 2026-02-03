import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table for authentication and user management
  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.optional(v.string()), // For email/password authentication
    image: v.optional(v.string()),
    emailVerified: v.optional(v.number()),
    role: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  // Destinations table for travel destinations
  destinations: defineTable({
    name: v.string(),
    description: v.string(),
    location: v.string(),
    imageUrl: v.string(),
    price: v.number(),
    duration: v.string(),
    rating: v.number(),
    featured: v.boolean(),
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_featured", ["featured"])
    .index("by_rating", ["rating"])
    .index("by_createdAt", ["createdAt"]),

  // Bookings table for user bookings
  bookings: defineTable({
    userId: v.id("users"),
    destinationId: v.id("destinations"),
    travelers: v.number(),
    startDate: v.number(),
    endDate: v.number(),
    totalPrice: v.number(),
    status: v.string(), // "pending", "confirmed", "cancelled"
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_destinationId", ["destinationId"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  // Testimonials table for user reviews
  testimonials: defineTable({
    userId: v.id("users"),
    destinationId: v.optional(v.id("destinations")),
    userName: v.string(),
    userImage: v.optional(v.string()),
    rating: v.number(),
    comment: v.string(),
    featured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_destinationId", ["destinationId"])
    .index("by_featured", ["featured"])
    .index("by_rating", ["rating"])
    .index("by_createdAt", ["createdAt"]),

  // Sessions table for authentication
  sessions: defineTable({
    userId: v.id("users"),
    expires: v.number(),
    sessionToken: v.string(),
  })
    .index("by_sessionToken", ["sessionToken"])
    .index("by_userId", ["userId"]),

  // Accounts table for authentication providers
  accounts: defineTable({
    userId: v.id("users"),
    type: v.string(),
    provider: v.string(),
    providerAccountId: v.string(),
    refresh_token: v.optional(v.string()),
    access_token: v.optional(v.string()),
    expires_at: v.optional(v.number()),
    token_type: v.optional(v.string()),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
    session_state: v.optional(v.string()),
  })
    .index("by_provider", ["provider", "providerAccountId"])
    .index("by_userId", ["userId"]),

  // Invoices table
  invoices: defineTable({
    invoiceId: v.string(), // Custom ID e.g., 20231027-001
    userId: v.id("users"),
    items: v.array(
      v.object({
        description: v.string(),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    currency: v.string(), // "TTD" or "USD"
    conversionRate: v.number(), // Rate used at time of invoice
    totalAmount: v.number(),
    notes: v.optional(v.string()),
    status: v.string(), // "pending", "paid", "cancelled"
    dueDate: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_invoiceId", ["invoiceId"])
    .index("by_createdAt", ["createdAt"]),

  // Bank Accounts table (Admin Settings)
  bankAccounts: defineTable({
    bankName: v.string(),
    accountName: v.string(),
    accountNumber: v.string(),
    routingNumber: v.string(),
    bankAddress: v.string(),
    accountType: v.string(), // "Savings", "Checking"
    currency: v.string(), // "TTD", "USD"
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});
