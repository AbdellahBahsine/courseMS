'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
    username: string;
    firstName: string;
    lastName: string;
}

interface UserContextType {
    user: UserProfile | null;
    loading: boolean;
    setUser: (user: UserProfile | null) => void;
    courseCreated: boolean;
    setCourseCreated: (boolean : boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [courseCreated, setCourseCreated] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    });
                    setUser(response.data);
                } catch {}
            }
            setLoading(false);
        };

        fetchUserProfile();
    }, []);

    if (loading) return null;

    return (
        <UserContext.Provider value={{ user, loading, setUser, courseCreated, setCourseCreated }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
