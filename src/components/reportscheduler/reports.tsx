'use client';
// import Piechart from '@/components/piechart';
import Piechart from '@/components/piechart';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

import React from 'react'
import { json } from 'node:stream/consumers';
import Navbar from '@/components/navbar';
import ProtectedPage from '@/components/ProtectedPage';
import { DatePickerWithRange } from '@/components/Daterangepick';
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
import { useAppSelector } from '@/redux/store';
import { fetchgetReports } from '@/api/getreportschedulerdata';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload, faMinus, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

type reportlist = {
    reportEmails: string;
    reportName: string;
    status: boolean;
}

const Reports = () => {

    const { data: data, error: error } = useSWR<Array<reportlist>>('fetchgetReports', fetchgetReports);
    const date = useAppSelector((state) => state.calendarReducer.value)
    const [loading, setLoading] = useState(true);
    const [getReport, setgetReport] = useState<Array<reportlist>>([]);
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setgetReport(data)
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
            const newData = await fetchgetReports();
            console.log("from main Reports", newData)
            // Update the state with the new data
            if (newData) {
                setgetReport(newData);
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

            <div className='flex h-auto mr-4 mb-4 lg:w-full sm:w-full md:w-4/5'>
                <Card className='h-full w-full hover:shadow-xl'>
                    <CardHeader>
                        <CardTitle>
                            Reports
                        </CardTitle>

                    </CardHeader>
                    <CardContent>
                        {getReport.length == 0 ? (<div className='text-red-600'>Nothing to Show</div>) : (
                            <div><Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Report Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Edit/Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {getReport?.map((element) => (
                                        <TableRow key={element.reportName}>
                                            <TableCell className="font-medium">{element.reportName}</TableCell>
                                            {element.reportEmails && <TableCell>{element.reportEmails}</TableCell>}
                                            {element.status && <TableCell>{element.status}</TableCell>}
                                            <TableCell className='space-x-1'><FontAwesomeIcon className=' text-green-500' icon={faPencil} /><FontAwesomeIcon className=' text-red-600' icon={faTrash} /> <FontAwesomeIcon className=' text-blue-500' icon={faDownload} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table></div>)}
                    </CardContent>
                </Card>


            </div>



        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login Reports if not authenticated
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

export default Reports;