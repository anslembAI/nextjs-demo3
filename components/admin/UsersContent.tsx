
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Users, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { UserDialog } from "@/components/admin/UserDialog";

export function UsersContent() {
    const users = useQuery(api.users.list);
    const deleteUser = useMutation(api.users.remove);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleEditUser = (user: any) => {
        setSelectedUser(user);
        setIsUserDialogOpen(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsUserDialogOpen(true);
    };

    const handleDeleteUser = async (userId: any, userName: string) => {
        if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
            try {
                await deleteUser({ id: userId });
            } catch (error) {
                console.error("Failed to delete user:", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    if (!users) {
        return <div className="p-8 text-center text-muted-foreground">Loading users...</div>;
    }

    return (
        <>
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">All Users</h2>
                        <p className="text-sm text-muted-foreground">Manage your team members and their account permissions here.</p>
                    </div>
                    <button className="btn btn--primary" onClick={handleAddUser}>
                        <Users className="h-4 w-4" />
                        Add User
                    </button>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ml-2"
                                >
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                                                {user.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-muted-foreground font-bold">
                                                        {user.name?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ${user.role === 'Admin' ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                                            }`}>
                                            {user.role || "User"}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                            Active
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">
                                        {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                                onClick={() => handleEditUser(user)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                                                onClick={() => handleDeleteUser(user._id, user.name)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserDialog
                isOpen={isUserDialogOpen}
                onClose={() => setIsUserDialogOpen(false)}
                userToEdit={selectedUser}
            />
        </>
    );
}
