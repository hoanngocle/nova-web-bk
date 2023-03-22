// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { authSelector } from 'src/redux/slice/authSlice';

interface GuestGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
    const { children, fallback } = props;
    const auth = useAuth();
    const router = useRouter();
    const { token, currentUser } = useAppSelector(authSelector);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        console.log('GuestGuard');
        console.log(token, currentUser);

        // if (window.localStorage.getItem('userData')) {
        //     router.replace('/');
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.route]);

    // if (auth.loading || (!auth.loading && auth.user !== null)) {
    //     return fallback;
    // }

    return <>{children}</>;
};

export default GuestGuard;
