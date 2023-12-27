import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth() // retrieve logged in user from Clerk package
        const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = await req.json() // retrieve data sent from user input

        // Avoid possible errors
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!price) return new NextResponse("Price is required", { status: 400 })
        if (!categoryId) return new NextResponse("Category ID is required", { status: 400 })
        if (!colorId) return new NextResponse("Color ID is required", { status: 400 })
        if (!sizeId) return new NextResponse("Size ID is required", { status: 400 })
        if (!images || !images.length) return new NextResponse("Images are required", { status: 400 })        
        if (!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        // Check that the store is from the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        // Create Product in DB
        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                storeId: params.storeId
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const isFeatured = searchParams.get("isFeatured")

        if (!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        // Get all products available for the store in DB
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.log('[PRODUCTS_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
