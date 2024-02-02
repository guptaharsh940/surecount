import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { auth } from '@/redux/features/auth-slices';
import { filter } from '@/redux/features/filter-slices';
import { fetchfilterdata } from '@/api/getfilterdata';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
    const data2 = useAppSelector((state) => state.filterReducer.client);
    const fetchData = async () => {
        try {
            const data = await fetchfilterdata();
            if (data2.length == 0) {
                dispatch(filter.actions.setfilter(data));
            }
            console.log('Data received in component:', data);
            // Handle the data here
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    };

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
    fetchData()

    return <div>{children}</div>;
};

export default ProtectedPage;