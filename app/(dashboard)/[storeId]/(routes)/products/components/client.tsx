"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"
import { ProductColumn, columns } from "./columns"

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return ( 
        <>
            {/* Heading: Title, Description and Add Product */}
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Separator />
            <Heading title="API" description="API calls for Products" />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}
