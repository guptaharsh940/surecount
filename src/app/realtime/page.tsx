"use client"
import ProtectedPage from '@/components/ProtectedPage'
import Navbar from '@/components/navbar'
import { signIn, useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
// import { useAppSelector } from '@/redux/store'
import { store } from '@/redux/store'
import { DatePickerWithRange } from '@/components/Daterangepick'
import LineChart from '@/components/linechart'
import Rtfmonthbyweek from '@/components/charts/rtfmonthbyweek'
import BarChart from '@/components/barchart'
import Rtfweekbyday from '@/components/charts/rtfweekbyday'
import Rtfdodbyhour from '@/components/charts/rtfdodbyhour'
import Rtfthismonthweekbyyoy from '@/components/charts/rtfthismonthweekbyyoy'
import Rtfthisweekbyyoy from '@/components/charts/rtfgetthisweekbyyou'
import Rtfyearandmonth from '@/components/charts/rtfyearandmonth'
const Realtime = () => {
    const { data: session, status } = useSession();
    // const sample = useAppSelector((state)=> state.authReducer.value)
    return (
        <ProtectedPage>
            <Navbar />
            <div className="m-10">

                <div className='flex flex-col md:flex-row  my-5'>
                    <Rtfmonthbyweek/>
                    <Rtfweekbyday />

                </div>
                <div className='flex flex-col md:flex-row  my-5'>
                    <Rtfdodbyhour/>
                    <Rtfthismonthweekbyyoy/>
                </div>
                <div className='flex flex-col md:flex-row  my-5'>
                    <Rtfthisweekbyyoy/>
                    <Rtfyearandmonth/>
                </div>
                <div>

                </div>


            </div>

            {/* <div className='p-10 space-x-10'>
            <p>NextPage</p>
            {JSON.stringify(session) }
            {/* {JSON.stringify(sample) } */}

            {/* <button onClick={handleClick}>Refresh</button> 
            <Link className='text-slate-500 hover:text-slate-800' href='/'>Home</Link>
        </div> */}
            <div className="m-10">
            </div>
        </ProtectedPage>

    )
}

export default Realtime