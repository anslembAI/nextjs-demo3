
"use client"

import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface UserDialogProps {
    isOpen: boolean
    onClose: () => void
    userToEdit?: {
        _id: Id<"users">
        name: string
        email: string
        role?: string
    } | null
}

export function UserDialog({ isOpen, onClose, userToEdit }: UserDialogProps) {
    const createUser = useMutation(api.users.create)
    const updateUser = useMutation(api.users.update)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("User")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name)
            setEmail(userToEdit.email)
            setRole(userToEdit.role || "User")
        } else {
            setName("")
            setEmail("")
            setRole("User")
        }
    }, [userToEdit, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (userToEdit) {
                await updateUser({
                    id: userToEdit._id,
                    name,
                    email,
                    role,
                })
            } else {
                await createUser({
                    name,
                    email,
                    role,
                    // random image for new users if not provided
                    image: `https://i.pravatar.cc/150?u=${Math.random()}`,
                })
            }
            onClose()
        } catch (error) {
            console.error("Failed to save user:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{userToEdit ? "Edit User" : "Add User"}</DialogTitle>
                    <DialogDescription>
                        {userToEdit
                            ? "Make changes to the user's profile here."
                            : "Add a new user to the system."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            Role
                        </Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Agent">Agent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
