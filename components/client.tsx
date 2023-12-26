"use client"

import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Heading } from "./ui/heading"
import { Separator } from "./ui/separator"
import { useParams, useRouter } from "next/navigation"

export const BillboardClient = () => {
    const router = useRouter()
    const params = useParams()

    return ( 
        <>
            {/* Heading: Title, Description and Add Billboard */}
            <div className="flex items-center justify-between">
                <Heading
                    title="Billboards (0)"
                    description="Manage billboards for your store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}
