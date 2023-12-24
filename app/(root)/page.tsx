"use client"

import { useEffect } from "react"

import { useStoreModal } from "@/hooks/use-store-modal"

export default function Home() {
  const { onOpen, isOpen } = useStoreModal()
  
  useEffect(() => {
    if (!isOpen) onOpen()
  }, [isOpen, onOpen])

  return <div>Root</div>
}
