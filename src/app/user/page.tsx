'use client';

import Navbar from '@/components/navbar'
import React from 'react'
import UsersActive from '@/components/userscomp/activecountshow';
import { UserForm } from '@/components/userscomp/userform';
import ProtectedAdmin from '@/components/ProtectedAdmin';
const User = () => {
    return (
        <ProtectedAdmin>
            <Navbar />
            <div className="m-10">
            <UsersActive/>
            <UserForm/>
                
            </div>
        </ProtectedAdmin>
    )
}

export default User