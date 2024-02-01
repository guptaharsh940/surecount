'use client';

import ProtectedPage from '@/components/ProtectedPage'
import Navbar from '@/components/navbar'
import React from 'react'
import UsersActive from '@/components/userscomp/activecountshow';
import { UserForm } from '@/components/userscomp/userform';
const User = () => {
    return (
        <ProtectedPage>
            <Navbar />
            <div className="m-10">
            <UsersActive/>
            <UserForm/>
                
            </div>
        </ProtectedPage>
    )
}

export default User