
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Edit2 } from "lucide-react";

export function SettingsView() {
    const bankAccounts = useQuery(api.settings.list);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);

    const handleEdit = (account: any) => {
        setSelectedAccount(account);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedAccount(null);
        setIsDialogOpen(true);
    };

    if (!bankAccounts) {
        return <div>Loading settings...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Bank Accounts</h2>
                    <p className="text-sm text-muted-foreground">Manage accounts for invoice payments.</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" /> Add Account
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bankAccounts.map((account) => (
                    <div key={account._id} className="p-6 bg-card border border-border/50 rounded-xl relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(account)}>
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold text-lg">{account.bankName}</h3>
                            <div className={`text-xs inline-flex px-2 py-0.5 rounded-full ${account.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-gray-500/10 text-gray-500'}`}>
                                {account.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                                <span>Account Name:</span>
                                <span className="font-medium text-foreground">{account.accountName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Account Number:</span>
                                <span className="font-medium text-foreground">{account.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Routing Number:</span>
                                <span className="font-medium text-foreground">{account.routingNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Currency:</span>
                                <span className="font-medium text-foreground">{account.currency}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Type:</span>
                                <span className="font-medium text-foreground">{account.accountType}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BankAccountDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                accountToEdit={selectedAccount}
            />
        </div>
    );
}

function BankAccountDialog({ isOpen, onClose, accountToEdit }: { isOpen: boolean, onClose: () => void, accountToEdit: any }) {
    const createAccount = useMutation(api.settings.create);
    const updateAccount = useMutation(api.settings.update);
    const removeAccount = useMutation(api.settings.remove);

    const isEditing = !!accountToEdit;

    // Use a form key to force reset when switching between add/edit or closing
    const [key, setKey] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            if (isEditing) {
                await updateAccount({
                    id: accountToEdit._id,
                    bankName: data.bankName as string,
                    accountName: data.accountName as string,
                    accountNumber: data.accountNumber as string,
                    routingNumber: data.routingNumber as string,
                    bankAddress: data.bankAddress as string,
                    accountType: data.accountType as string,
                    currency: data.currency as string,
                    isActive: data.isActive === "on",
                });
            } else {
                await createAccount({
                    bankName: data.bankName as string,
                    accountName: data.accountName as string,
                    accountNumber: data.accountNumber as string,
                    routingNumber: data.routingNumber as string,
                    bankAddress: data.bankAddress as string,
                    accountType: data.accountType as string,
                    currency: data.currency as string,
                });
            }
            onClose();
        } catch (error) {
            console.error("Failed to save account", error);
        }
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this account?")) {
            await removeAccount({ id: accountToEdit._id });
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Bank Account" : "Add Bank Account"}</DialogTitle>
                    <DialogDescription>
                        Enter the bank account details for receiving payments.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4" key={accountToEdit ? accountToEdit._id : 'new'}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bankName">Bank Name</Label>
                            <Input id="bankName" name="bankName" defaultValue={accountToEdit?.bankName} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accountName">Account Name</Label>
                            <Input id="accountName" name="accountName" defaultValue={accountToEdit?.accountName} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Account Number</Label>
                            <Input id="accountNumber" name="accountNumber" defaultValue={accountToEdit?.accountNumber} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="routingNumber">Routing Number</Label>
                            <Input id="routingNumber" name="routingNumber" defaultValue={accountToEdit?.routingNumber} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bankAddress">Bank Address</Label>
                        <Input id="bankAddress" name="bankAddress" defaultValue={accountToEdit?.bankAddress} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="accountType">Account Type</Label>
                            <Select name="accountType" defaultValue={accountToEdit?.accountType || "Checking"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Checking">Checking</SelectItem>
                                    <SelectItem value="Savings">Savings</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select name="currency" defaultValue={accountToEdit?.currency || "USD"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="TTD">TTD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="flex items-center space-x-2">
                            <Switch id="isActive" name="isActive" defaultChecked={accountToEdit?.isActive} />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    )}

                    <DialogFooter className="flex justify-between items-center sm:justify-between">
                        {isEditing ? (
                            <Button type="button" variant="destructive" onClick={handleDelete} size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        ) : <div></div>}
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
