'use client';
import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {Sidenavbar} from '@/components/Sidenavbar'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu" 
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import logo from "../../public/logo-surecount.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { isPlainObject } from '@reduxjs/toolkit';
// import { useAppSelector } from '@/redux/store';
// interface AppRouterInstance {
//     pathname: string; // Adjust the type accordingly based on your actual implementation
//     // Add other properties if your router object has them
// }
const Navbar = () => {

    const {data:session, status} = useSession();
    // console.log("fromhere",session)

    const pathname = usePathname()
    // const isActive = (href:string):boolean => router.pathname === href;
    return (
        <div className='flex shadow-xl min-h-16 relative'>
            <div className='h-auto w-12 flex items-center justify-center lg:hidden mx-3'>
                <Sidenavbar/>
            </div>
            <div className='self-center hidden  lg:flex '>
            <Image src={logo} alt="Surecount" className="h-12 w-auto self-center px-2 "></Image>
            </div>
            <div className='self-center absolute left-1/2 transform -translate-x-1/2 lg:hidden'>
            <Image src={logo} alt="Surecount" className="h-12 w-auto self-center px-2 "></Image>
            </div>

            <nav className='hidden sm:hidden md:hidden lg:flex space-x-10 place-self-center mx-auto pr-24 '>
                <Link href="/" className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Dashboard</Link>
                <Link href="/realtime" className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/realtime" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Real Time</Link>
                <Link href="/NextPage" className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/N" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>User</Link>
                <Link href="/reportscheduler" className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/reportscheduler" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Report Scheduler</Link>
                <Link href="/legacyreport" className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary ${pathname == "/legacyreport" ? 'bg-muted font-medium text-primary' : 'text-muted-foreground'}`}>Legacy Report</Link>
                {/* <Link href="/NextPage" className='flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground'>Next</Link> */}

            </nav>
            <div className='  absolute right-0 top-1/2 transform -translate-y-1/2 pr-3'>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Hi, {session?.user?.username}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>
                                    <div className='flex items-center justify-center w-28 h-10 my-2 '>
                                        <Button variant="ghost" onClick={(e) => {
                                            e.preventDefault();
                                            signOut();
                                        }}>
                                            <div className='space-x-1 '>

                                            <FontAwesomeIcon icon={faRightFromBracket} className="text-red-500"/>
                                            <span className="text-red-500">Logout</span>
                                            </div>
                                            </Button>
                                    </div>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}

export default Navbar