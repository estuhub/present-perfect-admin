import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth() // retrieve logged in user from Clerk package
        const { label, imageUrl } = await req.json() // retrieve data sent from user input

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!label) return new NextResponse("Label is required", { status: 400 })
        if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 })
        if (!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        // Create Store in DB
        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        if (!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        // Get all billboards available for the store in DB
        const billboard = await prismadb.billboard.findMany({
            where: { storeId: params.storeId }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
