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
import { fetchyearAndMonth } from '@/api/getrealtimedata';
import { Button } from '@/components/ui/button';
import LineChart2 from '../linechart2';


const Rtfyearandmonth = () => {

    const { data: data, error: error } = useSWR('fetchyearAndMonth', fetchyearAndMonth);
    const [loading, setLoading] = useState(true);
    const [yearandmonth, setyearandmonth] = useState<{ dates:Array<string>; label:Array<string>; data1:Array<number>; data2:Array<number>;}>();
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setyearandmonth(data)
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
            const newData = await fetchyearAndMonth();
            console.log("from main Rtfyearandmonth", newData)
            // Update the state with the new data
            if (newData) {
                setyearandmonth(newData);
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
            {!yearandmonth ? (
                <div>Loading</div>
            ) : (
                <LineChart2 inputdata1={yearandmonth.data1} inputdata2={yearandmonth.data2} labels={yearandmonth.label} mainlabels={yearandmonth.dates} title='Footfall - This Year vs Last Year'/>
            )

            }
        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login Rtfyearandmonth if not authenticated
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

export default Rtfyearandmonth;