"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

interface AuthDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
    const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Use Convex auth context
    const { signIn, signUp } = useAuth()

    const {
        register: registerSignIn,
        handleSubmit: handleSignInSubmit,
        formState: { errors: signInErrors },
        reset: resetSignIn,
    } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    })

    const {
        register: registerSignUp,
        handleSubmit: handleSignUpSubmit,
        formState: { errors: signUpErrors },
        reset: resetSignUp,
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    })

    const onSignIn = async (data: z.infer<typeof signInSchema>) => {
        setIsLoading(true)
        setError(null)
        try {
            await signIn(data.email, data.password)
            onOpenChange(false)
            resetSignIn()
        } catch (err: any) {
            setError(err.message || "Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    const onSignUp = async (data: z.infer<typeof signUpSchema>) => {
        setIsLoading(true)
        setError(null)
        try {
            await signUp(data.name, data.email, data.password)
            onOpenChange(false)
            resetSignUp()
        } catch (err: any) {
            const msg = err.message || "Failed to create account."
            if (msg.includes("already exists")) {
                setError("This email is already registered. Switching to Sign In...")
                setTimeout(() => {
                    setActiveTab("signin")
                    setError("Please sign in with your email and password.")
                    resetSignUp()
                }, 1500)
            } else {
                setError(msg)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        {activeTab === "signin" ? "Welcome Back" : "Create Account"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {activeTab === "signin"
                            ? "Enter your details to sign in to your account"
                            : "Enter your details to create a new account"}
                    </DialogDescription>
                </DialogHeader>

                <Tabs
                    value={activeTab}
                    onValueChange={(val) => {
                        setActiveTab(val as "signin" | "signup")
                        setError(null)
                    }}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <form onSubmit={handleSignInSubmit(onSignIn)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input
                                    id="signin-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    {...registerSignIn("email")}
                                />
                                {signInErrors.email && (
                                    <p className="text-sm text-red-500">{signInErrors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                    id="signin-password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...registerSignIn("password")}
                                />
                                {signInErrors.password && (
                                    <p className="text-sm text-red-500">{signInErrors.password.message}</p>
                                )}
                            </div>

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Sign In
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signup-name">Full Name</Label>
                                <Input
                                    id="signup-name"
                                    placeholder="John Doe"
                                    {...registerSignUp("name")}
                                />
                                {signUpErrors.name && (
                                    <p className="text-sm text-red-500">{signUpErrors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    {...registerSignUp("email")}
                                />
                                {signUpErrors.email && (
                                    <p className="text-sm text-red-500">{signUpErrors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="At least 8 characters"
                                    {...registerSignUp("password")}
                                />
                                {signUpErrors.password && (
                                    <p className="text-sm text-red-500">{signUpErrors.password.message}</p>
                                )}
                            </div>

                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Sign Up
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
