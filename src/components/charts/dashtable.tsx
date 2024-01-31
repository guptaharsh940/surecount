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
interface MyDataDayofWeek {
    region: string;
    monday: number | null;
    tuesday: number | null;
    wednesday: number | null;
    thursday: number | null;
    friday: number | null;
    saturday: number | null;
    sunday: number | null;
}
const DashTablebyWeek = () => {

    const { data, error } = useSWR('fetchDatabyregionbydayofweek', fetchDatabyregionbydayofweek);
    const date = useAppSelector((state) => state.calendarReducer.value)
    const [loading, setLoading] = useState(true);
    const [mainDashTableData, setmainDashTableData] = useState<MyDataDayofWeek[]>();



    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setmainDashTableData(data)
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
            const newData = await fetchDatabyregionbydayofweek();
            console.log("from main page", newData)
            // Update the state with the new data
            if (newData) {
                setmainDashTableData(newData);
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
            {!mainDashTableData ? (
                <div>Loading</div>
            ) : (
                <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Region</TableHead>
                                <TableHead>Monday</TableHead>
                                <TableHead>Tuesday</TableHead>
                                <TableHead>Wednesday</TableHead>
                                <TableHead>Thursday</TableHead>
                                <TableHead>Friday</TableHead>
                                <TableHead>Saturday</TableHead>
                                <TableHead>Sunday</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mainDashTableData?.map((element) => (
                                <TableRow key={element.region}>
                                    <TableCell className="font-medium">{element.region}</TableCell>
                                    {element.monday && <TableCell>{element.monday}</TableCell>}
                                    {element.tuesday && <TableCell>{element.tuesday}</TableCell>}
                                    {element.wednesday && <TableCell>{element.wednesday}</TableCell>}
                                    {element.thursday && <TableCell>{element.thursday}</TableCell>}
                                    {element.friday && <TableCell>{element.friday}</TableCell>}
                                    {element.saturday && <TableCell>{element.saturday}</TableCell>}
                                    {element.sunday && <TableCell>{element.sunday}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
            )

            }
        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login page if not authenticated
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default DashTablebyWeek