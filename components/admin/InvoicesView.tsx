
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, FileText, Download, TrendingUp } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export function InvoicesView() {
    const invoices = useQuery(api.invoices.list);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // For handling detailed view in future if needed
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

    const handleCreate = () => {
        setSelectedInvoice(null);
        setIsDialogOpen(true);
    };

    if (!invoices) {
        return <div>Loading invoices...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Invoices</h2>
                    <p className="text-sm text-muted-foreground">Manage and track client payments.</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" /> Create Invoice
                </Button>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Invoice ID</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {invoices.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                        No invoices found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                invoices.map((invoice) => (
                                    <tr key={invoice._id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{invoice.invoiceId}</td>
                                        <td className="p-4 align-middle">
                                            <div>
                                                <div className="font-medium text-foreground">{invoice.userName}</div>
                                                <div className="text-xs text-muted-foreground">{invoice.userEmail}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle font-medium">
                                            {invoice.currency} ${invoice.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <StatusBadge status={invoice.status} />
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">
                                            {format(invoice.createdAt, "MMM d, yyyy")}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateInvoiceDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        pending: "bg-yellow-500/10 text-yellow-600",
        paid: "bg-emerald-500/10 text-emerald-600",
        cancelled: "bg-red-500/10 text-red-600",
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] || "bg-gray-500/10 text-gray-600"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

function CreateInvoiceDialog({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const users = useQuery(api.users.list);
    const createInvoice = useMutation(api.invoices.create);

    const [userId, setUserId] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [conversionRate, setConversionRate] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [notes, setNotes] = useState("");

    const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }]);

    const handleAddItem = () => {
        setItems([...items, { description: "", quantity: 1, price: 0 }]);
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createInvoice({
                userId: userId as any,
                items,
                currency,
                conversionRate: Number(conversionRate),
                notes,
                dueDate: dueDate ? new Date(dueDate).getTime() : Date.now() + 7 * 24 * 60 * 60 * 1000, // Default 7 days
            });
            onClose();
            // Reset form
            setUserId("");
            setItems([{ description: "", quantity: 1, price: 0 }]);
        } catch (error) {
            console.error("Failed to create invoice", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                    <DialogDescription>Create and send an invoice to a client.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Client</Label>
                            <Select value={userId} onValueChange={setUserId} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users?.map(u => (
                                        <SelectItem key={u._id} value={u._id}>{u.name} ({u.email})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-end">
                        <div className="space-y-2">
                            <Label>Currency</Label>
                            <Select value={currency} onValueChange={(val) => {
                                setCurrency(val);
                                // Simple default suggestion, obviously simplistic
                                if (val === 'TTD') setConversionRate(6.75);
                                if (val === 'USD') setConversionRate(1);
                            }}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="TTD">TTD ($)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Exchange Rate (1 USD = ?)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={conversionRate}
                                onChange={e => setConversionRate(Number(e.target.value))}
                                disabled={currency === 'USD'}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Items</Label>
                            <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                                <Plus className="h-3 w-3 mr-1" /> Add Item
                            </Button>
                        </div>

                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-end">
                                <div className="col-span-6">
                                    <Input
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Input
                                        type="number"
                                        min="1"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Price"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    {items.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveItem(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end p-2 bg-muted/20 rounded-lg">
                            <span className="font-semibold mr-2">Total:</span>
                            <span className="font-mono text-lg">{currency} ${calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea
                            placeholder="Additional notes, payment terms, or thank you message..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Create Invoice</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
