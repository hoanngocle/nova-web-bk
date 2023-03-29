// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Hooks Import
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { authSelector } from 'src/redux/slice/authSlice';

interface AuthGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children, fallback } = props;
    const router = useRouter();
    const { loading, token, currentUser } = useAppSelector(authSelector);

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (currentUser === null) {
                if (router.asPath !== '/') {
                    router.replace({
                        pathname: '/login',
                        query: { returnUrl: router.asPath }
                    });
                } else {
                    router.replace('/login');
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.route]
    );

    if (loading || currentUser === null) {
        return fallback;
    }

    return <>{children}</>;
};

export default AuthGuard;
