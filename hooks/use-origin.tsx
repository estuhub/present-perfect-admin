import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)

    // Check if window is available
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ''

    // Hydration trick
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return ''

    return origin
}

// In server side, window does not exists, that's why we need to check first to avoid hydration issues
