import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(
    req: Request,
    { params }: { params: { productId: string }}
) {
    try {        
        // Avoid possible errors
        if (!params.productId) return new NextResponse("Product ID is required", { status: 400 })

        // Get all products available for the store in DB
        const product = await prismadb.product.findUnique({
            where: { id: params.productId },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string }}
) {
    try {
        const { userId } = auth()
        const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = await req.json()

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!price) return new NextResponse("Price is required", { status: 400 })
        if (!categoryId) return new NextResponse("Category ID is required", { status: 400 })
        if (!colorId) return new NextResponse("Color ID is required", { status: 400 })
        if (!sizeId) return new NextResponse("Size ID is required", { status: 400 })
        if (!images || !images.length) return new NextResponse("Images are required", { status: 400 })
        if (!params.productId) return new NextResponse("Product ID id is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Update Product in DB
        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived,
            }
        })

        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                }
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_PATCH]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId: string }}
) {
    try {
        const { userId } = auth()
        
        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!params.productId) return new NextResponse("Product ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })
        
        // Delete Product in DB
        const product = await prismadb.product.deleteMany({
            where: { id: params.productId }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
