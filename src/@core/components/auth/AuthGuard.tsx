// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { authSelector } from 'src/redux/slice/authSlice';

interface AuthGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children, fallback } = props;
    const auth = useAuth();
    const router = useRouter();
    const { token, currentUser } = useAppSelector(authSelector);

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            console.log('AuthGuard');
            console.log(currentUser);
            console.log(token);

            // if (auth.user === null && !window.localStorage.getItem('userData')) {
            //     if (router.asPath !== '/') {
            //         router.replace({
            //             pathname: '/login',
            //             query: { returnUrl: router.asPath }
            //         });
            //     } else {
            //         router.replace('/login');
            //     }
            // }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.route]
    );

    if (auth.loading || auth.user === null) {
        return fallback;
    }

    return <>{children}</>;
};

export default AuthGuard;
