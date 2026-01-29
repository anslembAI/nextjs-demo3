"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    destination: "Paris, France",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "Voyage Collective by VTS made our honeymoon absolutely magical. Every detail was perfectly planned, from the private Eiffel Tower dinner to the hidden gems only locals know about. We'll definitely book with them again!",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    destination: "Tokyo, Japan",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "The attention to detail was incredible. Our Japan trip was seamless from start to finish. The local guides were knowledgeable, and the itinerary struck the perfect balance between culture and adventure.",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    destination: "Santorini, Greece",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "I've traveled to many places, but Voyage Collective by VTS's Santorini package exceeded all expectations. The boutique hotel they recommended was stunning, and the sunset catamaran cruise was unforgettable.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="overline">Testimonials</p>
          <h2 className="text-responsive-h2 mb-4">
            What Travelers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read stories from our satisfied travelers who have experienced unforgettable journeys with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="h-12 w-12" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent-sunset text-accent-sunset"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location} · {testimonial.destination}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-accent-sunset text-accent-sunset"
                />
              ))}
            </div>
            <span className="font-medium">4.9/5 Rating</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-medium">10,000+</span>
            <span>Happy Travelers</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-medium">50+</span>
            <span>Destinations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
