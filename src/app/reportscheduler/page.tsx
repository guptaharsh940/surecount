'use client';

import ProtectedPage from '@/components/ProtectedPage'
import Navbar from '@/components/navbar'
import React from 'react'

const Reportscheduler = () => {
    return (
        <ProtectedPage>
            <Navbar/>
        </ProtectedPage>
    )
}

export default Reportscheduler