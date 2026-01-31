import { NextResponse } from "next/server"

export async function POST() {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Inquiry received" })
}
