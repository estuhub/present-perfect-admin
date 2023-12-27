import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth() // retrieve logged in user from Clerk package
        const { name, value } = await req.json() // retrieve data sent from user input

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!value) return new NextResponse("Value is required", { status: 400 })
        if (!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        // Create Color in DB
        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLOR_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        if (!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        // Get all colors available for the store in DB
        const colors = await prismadb.color.findMany({
            where: { storeId: params.storeId }
        })

        return NextResponse.json(colors)
    } catch (error) {
        console.log('[COLORS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
