import { UserButton, auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "./store-switcher"
import prismadb from "@/lib/prismadb"
import { ModeToggle } from "./theme-toggle"

const Navbar = async () => {
    const { userId } = auth()

    if (!userId) redirect('/sign-in')

    const stores = await prismadb.store.findMany({
        where: { userId },
    })

    return (
        <div className="flex h-16 items-center px-4 border-b">
            <StoreSwitcher items={stores} /> {/* Store Switcher using Combobox */}
            <MainNav className="mx-6"/> {/* Routes */}
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <UserButton afterSignOutUrl="/" /> {/* User Button using Clerk */}
            </div>
        </div>
    )
}
 
export default Navbar
