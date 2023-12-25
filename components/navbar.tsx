import { UserButton } from "@clerk/nextjs"

import { MainNav } from "@/components/main-nav"

const Navbar = () => {
    return (
        <div className="flex h-16 items-center px-4 border-b">
            {/* Store Switcher using Combobox */}
            <div>This will be the store switcher</div>
            {/* Routes */}
            <MainNav className="mx-6"/>
            {/* User Button using Clerk */}
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}
 
export default Navbar
