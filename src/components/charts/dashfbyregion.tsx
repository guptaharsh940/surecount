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
import { fetchDatabyregion } from '@/api/getdashboarddata';
import { Button } from '@/components/ui/button';
import Fbyregion from '@/components/charts/fbyregion';

const Dashfbyregion = () => {

    const { data, error } = useSWR('fetchDatabyregion', fetchDatabyregion);
    const date = useAppSelector((state) => state.calendarReducer.value)
    const [loading, setLoading] = useState(true);
    const [mainDashboarddata, setmainDashboarddata] = useState<{ adjTotalArray: Array<number>; regionArray: Array<string>; }>();
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setmainDashboarddata(data)
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
            const newData = await fetchDatabyregion();
            console.log("from main page", newData)
            // Update the state with the new data
            if (newData) {
                setmainDashboarddata(newData);
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
            {!mainDashboarddata ? (
                <div>Loading</div>
            ) : (
                <Piechart inputdata={mainDashboarddata.adjTotalArray} labels={mainDashboarddata.regionArray} title='Footfall by Region'/>
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

export default Dashfbyregion