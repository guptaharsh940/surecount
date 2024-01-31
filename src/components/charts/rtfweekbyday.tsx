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
import { fetchWeekbyDay } from '@/api/getrealtimedata';
import { Button } from '@/components/ui/button';


const Rtfweekbyday = () => {

    const { data: data, error: error } = useSWR('fetchWeekbyDay', fetchWeekbyDay);
    const [loading, setLoading] = useState(true);
    const [mainWeekbyDay, setmainWeekbyDay] = useState<{ adjTotal:Array<number>; weeks:Array<string>; }>({adjTotal:[], weeks:[]});
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setmainWeekbyDay(data)
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
            const newData = await fetchWeekbyDay();
            console.log("from main Rtfweekbyday", newData)
            // Update the state with the new data
            if (newData) {
                setmainWeekbyDay(newData);
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
            {!mainWeekbyDay ? (
                <div>Loading</div>
            ) : (
                <BarChart inputdata={mainWeekbyDay.adjTotal} labels={mainWeekbyDay.weeks} title = "Footfall - This Week By Day"/>
            )

            }
        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login Rtfweekbyday if not authenticated
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

export default Rtfweekbyday;