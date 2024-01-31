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
import { fetchStoresbyregion } from '@/api/getdashboarddata';
import { Button } from '@/components/ui/button';


const Fbyregion = () => {

    const { data: data, error: error } = useSWR('fetchStoresbyregion', fetchStoresbyregion);
    const date = useAppSelector((state) => state.calendarReducer.value)
    const [loading, setLoading] = useState(true);
    const [mainRegionbystoredata, setmainRegionbystoredata] = useState<{ storeCount: Array<number>; regionArray: Array<string>; }>();
    useEffect(() => {
        if (data) {
            const timeoutId = setTimeout(() => {
                fetchDataAndUpdate();
                setLoading(false);
                console.log(data)
                if (data) {

                    setmainRegionbystoredata(data)
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
            const newData = await fetchStoresbyregion();
            console.log("from main Fbyregion", newData)
            // Update the state with the new data
            if (newData) {
                setmainRegionbystoredata(newData);
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
            {!mainRegionbystoredata ? (
                <div>Loading</div>
            ) : (
                <Piechart inputdata={mainRegionbystoredata.storeCount} labels={mainRegionbystoredata.regionArray} title='No of Stores By Region'/>
            )

            }
        </>

    )
}
// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);

//   if (!session) {
//     // Redirect to login Fbyregion if not authenticated
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

export default Fbyregion;