import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth()
        const { name } = await req.json()

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!params.storeId) return new NextResponse("Store id is required", { status: 400 })

        // Update Store in DB
        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: { name }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORE_PATCH]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth()
        
        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Store id is required", { status: 400 })

        // Delete Store in DB
        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORE_DELETE]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
