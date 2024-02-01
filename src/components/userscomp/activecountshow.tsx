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
import { fetchgetuserdata } from '@/api/getusersdata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';



const UsersActive = () => {

    const { data: data, error: error } = useSWR('fetchgetuserdata', fetchgetuserdata);
    const date = useAppSelector((state) => state.calendarReducer.value)
    const [loading, setLoading] = useState(true);
    const [getUsers, setgetUsers] = useState<{ activeCount: number; usersCount: number; }>({ activeCount: 0, usersCount: 0 });
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setgetUsers(data)
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
            const newData = await fetchgetuserdata();
            console.log("from main UsersActive", newData)
            // Update the state with the new data
            if (newData) {
                setgetUsers(newData);
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
                            UsersActive
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-center items-center space-x-8'>
                        <div className='text-center'>
                            <FontAwesomeIcon icon={faUsers} className='text-4xl' />
                            <p className='text-2xl mt-2'>{getUsers.usersCount}</p>
                        </div>
                        <div className='text-center'>
                            <FontAwesomeIcon icon={faUser} className='text-4xl' />
                            <p className='text-2xl mt-2'>{getUsers.activeCount}</p>
                        </div>
                    </CardContent>
                </Card>


            </div>



        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login UsersActive if not authenticated
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

export default UsersActive;