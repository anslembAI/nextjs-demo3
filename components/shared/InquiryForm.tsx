"use client"

import * as React from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
// import { toast } from "sonner" // Or just use alert for now if toast not set up

export function InquiryForm({ className, packageTitle, inputClassName }: { className?: string, packageTitle?: string, inputClassName?: string }) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [date, setDate] = React.useState<Date>()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Reset form or show success message
            alert("Inquiry sent successfully! We will contact you soon.")
        }, 1500)
    }

    return (
        <div className={cn("grid gap-6", className)}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required disabled={isLoading} className={inputClassName} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" required disabled={isLoading} className={inputClassName} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" type="tel" required disabled={isLoading} className={inputClassName} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="guests">Guests</Label>
                            <Select defaultValue="2" disabled={isLoading}>
                                <SelectTrigger id="guests" className={inputClassName}>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Person</SelectItem>
                                    <SelectItem value="2">2 People</SelectItem>
                                    <SelectItem value="3">3 People</SelectItem>
                                    <SelectItem value="4">4+ People</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Travel Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground",
                                            inputClassName
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us about your trip preferences..."
                            className={cn("min-h-[100px]", inputClassName)}
                            disabled={isLoading}
                            defaultValue={packageTitle ? `I'm interested in booking the ${packageTitle} package.` : ""}
                        />
                    </div>

                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send Inquiry
                    </Button>
                </div>
            </form>

            {/* TODO: Integrate with real CRM or Email API */}
            {/* Endpoint: /api/inquiry */}
        </div>
    )
}
