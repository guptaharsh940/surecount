'use client';
// import Piechart from '@/components/piechart';
import Piechart from '@/components/piechart';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { signIn, useSession, getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next';
// import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
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
import Dashfbyregion from '@/components/charts/dashfbyregion';
import DashTablebyWeek from '@/components/charts/dashtable';
import Filter from '@/components/Filter';
import { redirect } from 'next/navigation';
const page = () => {


  const handlebutton = () => {


  };
  // const {data:session, status} = useSession();
  // console.log(session);
  // // const data = await getServerSession(authOptions);
  // const usedr = session?.user
  // console.log(usedr)
  return (
    <ProtectedPage>

      <Navbar />

      <div className="m-10">
        <div className='flex space-x-4'>

          <DatePickerWithRange />
          <Filter />
          {/* <Button variant="ghost" onClick = {handlebutton}>
                        Refresh
                    </Button> */}
          <div>


            <button className='absolute right-8 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-300' onClick={handlebutton}>
              Create Report
            </button>
          </div>
        </div>

        {/* <div>
          Here- {JSON.stringify(mainDashboarddata)}
        </div> */}
        {/* <div className='p-10 space-x-10'>

      <Link className='text-slate-500 hover:text-slate-800' href='/'>Home</Link>
      <Link className='text-slate-500 hover:text-slate-800' href='/NextPage'>Next Page</Link>
      <button onClick={(e) => {
        e.preventDefault();
        signIn();
      }}>
        Login</button>
        </div>
      <Piechart/> */}
        <div className='flex flex-col md:flex-row  my-5'>
          <Dashfbyregion />
          <Fbyregion />

        </div>
        <DashTablebyWeek />
        <div>
        </div>


      </div>
    </ProtectedPage>
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

export default page