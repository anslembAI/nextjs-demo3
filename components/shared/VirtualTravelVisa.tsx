"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const services = [
    {
        title: "RedotPay",
        description: "Seamless global crypto payments. Spend your crypto anywhere Visa is accepted with real-time conversion.",
        image: "/images/redotpaycard.jpeg",
        link: "https://url.hk/i/en/6ysyt",
    },
    {
        title: "Trustyfy",
        description: "Verified and secure travel transactions. Ensuring your payments are safe and your data is protected worldwide.",
        image: "/images/trustyfy.png",
        link: "https://app.trustyfy.com?by=101ld0",
    },
    {
        title: "Wise",
        description: "Low-cost money transfers and spending abroad. The international account that saves you money around the world.",
        image: "/images/wise.png",
        link: "https://wise.com/invite/ihpc/anslemb",
    },
]

export function VirtualTravelVisa() {
    return (
        <section id="virtual-visa-cards" className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
                        Virtual Travel Visa Cards
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Modern financial solutions for the global traveler. Secure access to funds and seamless payments wherever your journey takes you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card group flex flex-col">
                                <div className="relative h-56 w-full overflow-hidden bg-white p-6 flex items-center justify-center">
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                                <div className="p-6 pt-0 mt-auto">
                                    <Button asChild className="w-full rounded-full" size="lg">
                                        <Link href={service.link} target="_blank" rel="noopener noreferrer">
                                            Get Card
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
