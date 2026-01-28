"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Plane } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    description: "Experience the city of lights with its iconic landmarks, world-class cuisine, and romantic ambiance.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    rating: 4.9,
    duration: "5-7 days",
    price: "$1,299",
    badge: "Popular",
    badgeVariant: "aurora" as const,
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    description: "Discover the perfect blend of ancient traditions and cutting-edge technology in vibrant Tokyo.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.8,
    duration: "7-10 days",
    price: "$1,599",
    badge: "Trending",
    badgeVariant: "sunset" as const,
  },
  {
    id: 3,
    name: "Santorini, Greece",
    description: "Relax in stunning white-washed villages overlooking the crystal-clear Aegean Sea.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    rating: 4.9,
    duration: "4-6 days",
    price: "$1,099",
    badge: "Best Value",
    badgeVariant: "aurora" as const,
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    description: "Escape to paradise with lush jungles, ancient temples, and pristine beaches.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.7,
    duration: "6-9 days",
    price: "$999",
    badge: "Adventure",
    badgeVariant: "sunset" as const,
  },
  {
    id: 5,
    name: "New York, USA",
    description: "Immerse yourself in the energy of the city that never sleeps with endless attractions.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    rating: 4.8,
    duration: "4-5 days",
    price: "$1,199",
    badge: "City Break",
    badgeVariant: "default" as const,
  },
  {
    id: 6,
    name: "Maldives",
    description: "Experience ultimate luxury in overwater villas surrounded by turquoise waters.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    rating: 5.0,
    duration: "5-7 days",
    price: "$2,499",
    badge: "Luxury",
    badgeVariant: "sunset" as const,
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="section bg-surface-2">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="overline">Explore</p>
          <h2 className="text-responsive-h2 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked destinations that offer unforgettable experiences and memories that last a lifetime.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden p-0 group">
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={800}
                  height={224}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={destination.badgeVariant}>
                    {destination.badge}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold tracking-tight">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-accent-sunset text-accent-sunset" />
                    <span className="font-medium">{destination.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Plane className="h-4 w-4" />
                    <span>Flight included</span>
                  </div>
                </div>
              </CardContent>

              {/* Footer */}
              <CardFooter className="p-5 pt-0 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-bold text-primary">{destination.price}</p>
                </div>
                <Button variant="secondary">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="gap-2">
            <MapPin className="h-5 w-5" />
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
