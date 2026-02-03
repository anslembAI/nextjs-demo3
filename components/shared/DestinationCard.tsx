"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Loader2, Sparkles } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Destination } from "@/data/destinations";

interface DestinationCardProps {
    destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
    const getClothingRecommendations = useAction(api.ai.getClothingRecommendations);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState("");

    const handleGetRecommendations = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(true);
        // Only fetch if we haven't already (or simple cache strategy)
        if (recommendation) return;

        setIsLoading(true);

        try {
            const month = new Date().toLocaleString('default', { month: 'long' });
            const result = await getClothingRecommendations({
                destination: destination.name,
                description: destination.shortDescription,
                currentMonth: month,
            });
            setRecommendation(result);
        } catch (error) {
            console.error("Error getting recommendations:", error);
            setRecommendation("Sorry, I couldn't generate recommendations at this time. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Link href={`/?view=destinations`}>
                <Card className="group relative overflow-hidden h-[300px] border-none shadow-none text-white">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 text-primary hover:bg-white shadow-lg gap-2"
                            onClick={handleGetRecommendations}
                        >
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            <span className="text-xs font-semibold">Clothing Tips</span>
                        </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                        <p className="text-sm text-slate-300 line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {destination.shortDescription}
                        </p>
                        <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                            Explore <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </Card>
            </Link>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Shirt className="w-5 h-5 text-blue-500" />
                            Fashion & Packing Guide
                        </DialogTitle>
                        <DialogDescription>
                            AI-powered clothing recommendations for {destination.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <p className="text-sm text-muted-foreground animate-pulse">Consulting the fashion oracle...</p>
                            </div>
                        ) : (
                            <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-lg">
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {recommendation}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
