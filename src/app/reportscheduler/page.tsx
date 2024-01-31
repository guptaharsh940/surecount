'use client';

import ProtectedPage from '@/components/ProtectedPage'
import Navbar from '@/components/navbar'
import React from 'react'
import Reports from '@/components/reportscheduler/reports';
import { ReportForm } from '@/components/reportscheduler/reprortsender';
const Reportscheduler = () => {
    return (
        <ProtectedPage>
            <Navbar />
            <div className="m-10">
            <Reports/>
            <ReportForm/>
                
            </div>
        </ProtectedPage>
    )
}

export default Reportscheduler