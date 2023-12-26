"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { BillboardColumn } from "./columns"

interface CellActionProps {
    data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> =  ({
    data
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span> {/* sr-only visible with screen readers, accesibility feature */}
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" /> Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="h-4 w-4 mr-2" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}