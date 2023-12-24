import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div className="p-4">
            <h1>Hello Admin Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
  }
  