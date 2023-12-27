import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth() // retrieve logged in user from Clerk package
        const { name } = await req.json() // retrieve data sent from user input

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })

        // Create Store in DB
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORES_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
