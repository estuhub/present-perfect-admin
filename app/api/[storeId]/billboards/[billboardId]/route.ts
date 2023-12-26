import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string }}
) {
    try {        
        // Avoid possible errors
        if (!params.billboardId) return new NextResponse("Billboard ID is required", { status: 400 })

        // Get all billboards available for the store in DB
        const billboard = await prismadb.billboard.findUnique({
            where: { id: params.billboardId }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string }}
) {
    try {
        const { userId } = auth()
        const { label, imageUrl } = await req.json()

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!label) return new NextResponse("Label is required", { status: 400 })
        if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 })
        if (!params.billboardId) return new NextResponse("Billboard ID id is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Update Billboard in DB
        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: { label, imageUrl }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string }}
) {
    try {
        const { userId } = auth()
        
        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!params.billboardId) return new NextResponse("Billboard ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Delete Billboard in DB
        const billboard = await prismadb.billboard.deleteMany({
            where: { id: params.billboardId }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
