// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Hooks Import
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { authSelector } from 'src/redux/slice/authSlice';

interface GuestGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
    const { children, fallback } = props;
    const router = useRouter();
    const { loading, token, user } = useAppSelector(authSelector);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (user && token) {
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.route]);

    if (loading || (!loading && user !== null)) {
        return fallback;
    }

    return <>{children}</>;
};

export default GuestGuard;
