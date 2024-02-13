import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { auth } from '@/redux/features/auth-slices';
import { filter } from '@/redux/features/filter-slices';
import { fetchfilterdata } from '@/api/getfilterdata';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';

const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session || !('user' in session) ) {
        redirect('/auth/signin');
        return null;
    }
    if((session.user.userType!="Admin")){
        return <div>Unauthorized Access</div>
    }
    dispatch(auth.actions.logIn(session.user))

    return <div>{children}</div>;
};

export default ProtectedAdmin;