import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { auth } from '@/redux/features/auth-slices';
const ProtectedPage = ({ children }:{children:React.ReactNode}) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session || !('user' in session)) {
        redirect('/auth/signin');
        return null;
    }
    dispatch(auth.actions.logIn(session.user))
    return <div>{children}</div>;
};

export default ProtectedPage;