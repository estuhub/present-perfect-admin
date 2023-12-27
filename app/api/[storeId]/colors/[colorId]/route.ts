import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
    req: Request,
    { params }: { params: { colorId: string }}
) {
    try {        
        // Avoid possible errors
        if (!params.colorId) return new NextResponse("Color ID is required", { status: 400 })

        // Get all colors available for the store in DB
        const color = await prismadb.color.findUnique({
            where: { id: params.colorId }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLOR_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string }}
) {
    try {
        const { userId } = auth()
        const { name, value } = await req.json()

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!value) return new NextResponse("Value is required", { status: 400 })
        if (!params.colorId) return new NextResponse("Color ID id is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Update Color in DB
        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: { name, value }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLOR_PATCH]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, colorId: string }}
) {
    try {
        const { userId } = auth()
        
        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!params.colorId) return new NextResponse("Color ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Delete Color in DB
        const color = await prismadb.color.deleteMany({
            where: { id: params.colorId }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLOR_DELETE]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
