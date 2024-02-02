'use client';
// import Piechart from '@/components/piechart';
import Piechart from '@/components/piechart';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { signIn, useSession, getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next';
// import { getServerSession } from 'next-auth';
import Link from 'next/link'
import React from 'react'
import { json } from 'node:stream/consumers';
import Navbar from '@/components/navbar';
import ProtectedPage from '@/components/ProtectedPage';
import { DatePickerWithRange } from '@/components/Daterangepick';
import { useAppSelector } from '@/redux/store';
import { fetchDatabyregionbydayofweek } from '@/api/getdashboarddata';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchgetuserdata, fetchgetusers } from '@/api/getusersdata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
interface User {
    id: number;
    userName: string;
    profileName: string;
    password: string;
    email: string;
    image: string;
    logo: string;
    imageName: string;
    logoName: string;
    isAdmin: null | boolean;
    permission: boolean;
    maxUser: number;
    allClients: boolean;
    particularClients: boolean;
    numberOfUserCreated: null | number;
    createdBy: number;
    userClients: null | any; // Replace 'any' with the appropriate type when available
    nestedUserClients: null | any; // Replace 'any' with the appropriate type when available
    permissionBean: null | any; // Replace 'any' with the appropriate type when available
    xAuthToken: null | string;
    storeId: null | number;
    zoneId: null | number;
    clientId: null | number;
    device: null | string;
    deviceId: null | string;
    template: null | any; // Replace 'any' with the appropriate type when available
    templateId: number;
    clientName: string;
    userType: string;
    parentUserType: null | string;
    parentUserName: null | string;
    parentUserId: null | number;
};
const UsersTable = () => {

    const { data, error } = useSWR('fetchgetusers', fetchgetusers);
    const date = useAppSelector((state) => state.calendarReducer.value)
    const [loading, setLoading] = useState(true);
    const [usersTable, setusersTable] = useState<Array<User>>();
    const [page, setPage] = useState<number>(1);



    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setusersTable(data)
                }
            }, 10);
            return () => clearTimeout(timeoutId);
        }
    }, [data, date]);
    const fetchDataAndUpdate = async () => {
        try {
            // Set loading to true to show the loading message
            setLoading(true);

            // Fetch data using the fetchData function
            const newData = await fetchgetusers();
            console.log("from main page", newData)
            // Update the state with the new data
            if (newData) {
                setusersTable(newData);
            }

            // Set loading to false after data is fetched and updated
            setLoading(false);
        } catch (error) {
            // Handle errors if any
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    // const {data:session, status} = useSession();
    // console.log(session);
    // // const data = await getServerSession(authOptions);
    // const usedr = session?.user
    // console.log(usedr)
    return (
        <>
            {!usersTable ? (
                <></>
            ) : (usersTable.length > 0 ?
                (<div><Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Profile Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Edit/Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersTable.slice(page - 1, page - 1 + 10)?.map((element) => (
                            <TableRow key={element.id}>
                                <TableCell className="font-medium">{element.userName}</TableCell>
                                {element.profileName && <TableCell>{element.profileName}</TableCell>}
                                {element.email && <TableCell>{element.email}</TableCell>}
                                <TableCell className='space-x-1'><FontAwesomeIcon className=' text-green-500' icon={faPencil} /><FontAwesomeIcon className=' text-red-600' icon={faTrash} /> <FontAwesomeIcon className=' text-blue-500' icon={faArrowsRotate} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => setPage(page - 1)} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(page)} isActive>{page}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(page + 2)}>{page + 2}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={()=>setPage(Math.floor(usersTable.length/10))}>{Math.floor(usersTable.length/10)}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext onClick={() => setPage(page + 1)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination></div>
                ) : (<></>)
            )

            }
        </>

    )
}


export default UsersTable