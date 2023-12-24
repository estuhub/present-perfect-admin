"use client"

import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modal"

export function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return <StoreModal />
}

// To avoid hydration issues between client-side and server-side rendering
