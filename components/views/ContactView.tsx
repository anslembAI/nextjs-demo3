
import { InquiryForm } from "@/components/shared/InquiryForm"
import { MapPin, Phone, Mail } from "lucide-react"

export function ContactView() {
    return (
        <div className="container px-4 md:px-6 py-12 pt-28 bg-background animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Get in Touch</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Whether you're ready to book or just have a few questions, we're here to help.
                            Our team of travel experts is available 24/7.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Visit Our Office</h3>
                                <p className="text-muted-foreground">123 Luxury Lane, Suite 100<br />New York, NY 10001</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Call Us</h3>
                                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                <p className="text-sm text-green-600 mt-1">Available 24/7</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email Us</h3>
                                <p className="text-muted-foreground">hello@luxetravel.com</p>
                                <p className="text-sm text-muted-foreground mt-1">Response within 2 hours</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-border/50">
                        <h3 className="font-semibold mb-2">Office Hours</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>9:00 AM - 6:00 PM EST</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span>10:00 AM - 4:00 PM EST</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-card shadow-xl rounded-3xl p-8 border border-border/50">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <InquiryForm className="space-y-4" />
                </div>
            </div>
        </div>
    )
}
