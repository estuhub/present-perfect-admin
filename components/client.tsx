"use client"

import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Heading } from "./ui/heading"
import { Separator } from "./ui/separator"

export const BillboardClient = () => {
    return ( 
        <>
            {/* Heading: Title, Description and Add Billboard */}
            <div className="flex items-center justify-between">
                <Heading
                    title="Billboards (0)"
                    description="Manage billboards for your store."
                />
                <Button>
                    <Plus className="w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}
