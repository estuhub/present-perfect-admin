import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
    req: Request,
    { params }: { params: { sizeId: string }}
) {
    try {        
        // Avoid possible errors
        if (!params.sizeId) return new NextResponse("Size ID is required", { status: 400 })

        // Get all sizes available for the store in DB
        const size = await prismadb.size.findUnique({
            where: { id: params.sizeId }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string }}
) {
    try {
        const { userId } = auth()
        const { name, value } = await req.json()

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!value) return new NextResponse("Value is required", { status: 400 })
        if (!params.sizeId) return new NextResponse("Size ID id is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Update Size in DB
        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: { name, value }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_PATCH]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string }}
) {
    try {
        const { userId } = auth()
        
        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!params.sizeId) return new NextResponse("Size ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Delete Size in DB
        const size = await prismadb.size.deleteMany({
            where: { id: params.sizeId }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_DELETE]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
