'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/user.context';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper = (props: P) => {
        const router = useRouter();
        const { user, loading } = useUser();
        const [isClient, setIsClient] = useState(false);
        const [isRedirecting, setIsRedirecting] = useState(false);

        useEffect(() => {
            
            setIsClient(true);

            if (!loading && !user) {
                setIsRedirecting(true);
                router.replace('/login');
            }
        }, [loading, user, router]);

        if (!isClient || isRedirecting) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;