"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plane, Calendar, MapPin, Users, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* World Grid Background */}
      <div className="absolute inset-0 world-grid -z-10" />
      
      {/* Hero Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient -z-10" />

      <div className="container">
        <div className="section flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Plane className="h-4 w-4" />
              Premium Travel Experiences
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-responsive-h1 font-bold tracking-tight mb-6 animate-slide-up">
            Discover the World with{" "}
            <span className="text-gradient">Global Horizon</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up animation-delay-100">
            Curated journeys to extraordinary destinations. Experience premium travel with personalized itineraries designed just for you.
          </p>

          {/* Search Form */}
          <div className="w-full max-w-4xl animate-slide-up animation-delay-200">
            <div className="card bg-background/80 backdrop-blur-sm p-4 md:p-6">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Destination
                  </label>
                  <Input
                    type="text"
                    placeholder="Where to?"
                    className="h-12"
                  />
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Dates
                  </label>
                  <Input
                    type="text"
                    placeholder="Add dates"
                    className="h-12"
                  />
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Travelers
                  </label>
                  <Input
                    type="text"
                    placeholder="Add guests"
                    className="h-12"
                  />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button className="w-full h-12 text-base" size="lg">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in animation-delay-300">
            <span className="font-medium">Popular:</span>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowRight className="h-3 w-3" />
              Paris
            </a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowRight className="h-3 w-3" />
              Tokyo
            </a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowRight className="h-3 w-3" />
              New York
            </a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowRight className="h-3 w-3" />
              Bali
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
