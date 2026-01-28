import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDestinations = mutation({
  handler: async (ctx) => {
    const destinations = [
      {
        name: "Bali, Indonesia",
        description: "Experience the magic of Bali with its stunning temples, rice terraces, and beautiful beaches. Perfect for relaxation and adventure.",
        location: "Bali, Indonesia",
        imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
        price: 1299,
        duration: "7 days",
        rating: 4.8,
        featured: true,
        tags: ["beach", "temple", "culture", "adventure"],
      },
      {
        name: "Santorini, Greece",
        description: "Discover the breathtaking beauty of Santorini with its iconic white buildings, blue domes, and stunning sunsets over the Aegean Sea.",
        location: "Santorini, Greece",
        imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop",
        price: 1599,
        duration: "5 days",
        rating: 4.9,
        featured: true,
        tags: ["beach", "romantic", "sunset", "culture"],
      },
      {
        name: "Kyoto, Japan",
        description: "Immerse yourself in Japanese culture with ancient temples, traditional gardens, and the famous cherry blossom season.",
        location: "Kyoto, Japan",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
        price: 1899,
        duration: "8 days",
        rating: 4.7,
        featured: true,
        tags: ["culture", "temple", "nature", "food"],
      },
      {
        name: "Machu Picchu, Peru",
        description: "Explore the ancient Incan citadel set high in the Andes Mountains. A once-in-a-lifetime adventure for history enthusiasts.",
        location: "Machu Picchu, Peru",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop",
        price: 2199,
        duration: "6 days",
        rating: 4.9,
        featured: true,
        tags: ["adventure", "history", "mountain", "trekking"],
      },
      {
        name: "Maldives",
        description: "Escape to paradise with crystal-clear waters, overwater bungalows, and world-class diving experiences.",
        location: "Maldives",
        imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop",
        price: 2499,
        duration: "5 days",
        rating: 4.8,
        featured: true,
        tags: ["beach", "luxury", "diving", "romantic"],
      },
      {
        name: "Swiss Alps, Switzerland",
        description: "Experience majestic mountain views, charming villages, and world-class skiing in the heart of Europe.",
        location: "Swiss Alps, Switzerland",
        imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop",
        price: 1799,
        duration: "6 days",
        rating: 4.7,
        featured: false,
        tags: ["mountain", "skiing", "nature", "adventure"],
      },
    ];

    const now = Date.now();
    for (const destination of destinations) {
      await ctx.db.insert("destinations", {
        ...destination,
        createdAt: now,
        updatedAt: now,
      });
    }

    return { message: `Seeded ${destinations.length} destinations` };
  },
});

export const seedTestimonials = mutation({
  handler: async (ctx) => {
    // First, create sample users
    const users = [
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        image: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Michael Chen",
        email: "michael@example.com",
        image: "https://i.pravatar.cc/150?img=2",
      },
      {
        name: "Emily Rodriguez",
        email: "emily@example.com",
        image: "https://i.pravatar.cc/150?img=3",
      },
    ];

    const now = Date.now();
    const userIds: string[] = [];

    for (const user of users) {
      const userId = await ctx.db.insert("users", {
        ...user,
        createdAt: now,
        updatedAt: now,
      });
      userIds.push(userId);
    }

    const testimonials = [
      {
        userId: userIds[0] as any,
        destinationId: undefined as any,
        userName: "Sarah Johnson",
        userImage: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        comment: "An absolutely incredible experience! The tour guides were knowledgeable and the destinations were breathtaking.",
        featured: true,
      },
      {
        userId: userIds[1] as any,
        destinationId: undefined as any,
        userName: "Michael Chen",
        userImage: "https://i.pravatar.cc/150?img=2",
        rating: 5,
        comment: "Best travel experience of my life. Everything was perfectly organized and the accommodations exceeded expectations.",
        featured: true,
      },
      {
        userId: userIds[2] as any,
        destinationId: undefined as any,
        userName: "Emily Rodriguez",
        userImage: "https://i.pravatar.cc/150?img=3",
        rating: 4,
        comment: "Wonderful trip with great memories. The only minor issue was the flight delay, but everything else was perfect!",
        featured: true,
      },
    ];

    for (const testimonial of testimonials) {
      await ctx.db.insert("testimonials", {
        ...testimonial,
        createdAt: now,
        updatedAt: now,
      });
    }

    return { message: `Seeded ${testimonials.length} testimonials` };
  },
});

export const clearAll = mutation({
  handler: async (ctx) => {
    const destinations = await ctx.db.query("destinations").collect();
    for (const destination of destinations) {
      await ctx.db.delete(destination._id);
    }

    const testimonials = await ctx.db.query("testimonials").collect();
    for (const testimonial of testimonials) {
      await ctx.db.delete(testimonial._id);
    }

    return { message: "Cleared all data" };
  },
});
