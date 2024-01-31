'use client';
// import Piechart from '@/components/piechart';
import BarChart from '@/components/barchart'
import useSWR from 'swr';
import { useEffect, useState } from 'react';

import React from 'react'
import { json } from 'node:stream/consumers';
import Navbar from '@/components/navbar';
import ProtectedPage from '@/components/ProtectedPage';
import { DatePickerWithRange } from '@/components/Daterangepick';
import { useAppSelector } from '@/redux/store';
import { fetchMonthbyWeek } from '@/api/getrealtimedata';
import { Button } from '@/components/ui/button';
import LineChart from '../linechart';


const Rtfmonthbyweek = () => {

    const { data: data, error: error } = useSWR('fetchMonthbyWeek', fetchMonthbyWeek);
    const [loading, setLoading] = useState(true);
    const [mainMonthByWeek, setmainMonthByWeek] = useState<{ adjTotal:Array<number>; weeks:Array<string>; }>();
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setmainMonthByWeek(data)
                }
            }, 10);
            return () => clearTimeout(timeoutId);
        }
    }, [data]);
    const fetchDataAndUpdate = async () => {
        try {
            // Set loading to true to show the loading message
            setLoading(true);

            // Fetch data using the fetchData function
            const newData = await fetchMonthbyWeek();
            console.log("from main Rtfmonthbyweek", newData)
            // Update the state with the new data
            if (newData) {
                setmainMonthByWeek(newData);
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
            {!mainMonthByWeek ? (
                <div>Loading</div>
            ) : (
                <LineChart inputdata={mainMonthByWeek.adjTotal} labels={mainMonthByWeek.weeks} title='Footfall - This Month By Week'/>
            )

            }
        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login Rtfmonthbyweek if not authenticated
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

export default Rtfmonthbyweek;