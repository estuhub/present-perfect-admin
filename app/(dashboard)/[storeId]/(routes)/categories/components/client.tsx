"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"
import { CategoryColumn, columns } from "./columns"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return ( 
        <>
            {/* Heading: Title, Description and Add Categories */}
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Separator />
            <Heading title="API" description="API calls for Categories" />
            <ApiList entityName="categories" entityIdName="categoriesId" />
        </>
    )
}
