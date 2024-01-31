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
import { fetchdodbyhour } from '@/api/getrealtimedata';
import { Button } from '@/components/ui/button';
import LineChart2 from '../linechart2';


const Rtfdodbyhour = () => {

    const { data: data, error: error } = useSWR('fetchdodbyhour', fetchdodbyhour);
    const [loading, setLoading] = useState(true);
    const [dodDatabyhour, setdodDatabyhour] = useState<{ dates:Array<string>; label:Array<string>; data1:Array<number>; data2:Array<number>;}>({dates:[],label:[],data1:[],data2:[]});
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setdodDatabyhour(data)
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
            const newData = await fetchdodbyhour();
            console.log("from main Rtfdodbyhour", newData)
            // Update the state with the new data
            if (newData) {
                setdodDatabyhour(newData);
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
            {!dodDatabyhour ? (
                <div>Loading</div>
            ) : (
                <LineChart2 inputdata1={dodDatabyhour.data1} inputdata2={dodDatabyhour.data2} labels={dodDatabyhour.label} mainlabels={dodDatabyhour.dates} title='Footfall - Hourly (Today vs Yesterday)'/>
            )

            }
        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login Rtfdodbyhour if not authenticated
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

export default Rtfdodbyhour;