import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HamburgerMenuIcon} from '@radix-ui/react-icons'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function Sidenavbar() {
    const pathname = usePathname()

    return (
        // <div className="left-0">
            <Sheet>
                <SheetTrigger asChild>
                
                    <Button variant="ghost">
                        {/* <FontAwesomeIcon icon={faBars} size="lg"/> */}
                        <HamburgerMenuIcon style={{ width: '18px', height: '18px' }}/>
                        </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="mt-7">

                <Link href="/" className={`flex h-10 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Dashboard</Link>
                <Link href="/realtime" className={`flex h-10 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/realtime" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Real Time</Link>
                <Link href="/NextPage" className={`flex h-10 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/N" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>User</Link>
                <Link href="/reportscheduler" className={`flex h-10 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/reportscheduler" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Report Scheduler</Link>
                <Link href="/legacyreport" className={`flex h-10 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/legacyreport" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Legacy Report</Link>
                    </div>

                </SheetContent>
            </Sheet>
        // </div>
    );
}
