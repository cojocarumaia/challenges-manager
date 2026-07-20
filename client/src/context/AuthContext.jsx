/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] =
        useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {
                setCurrentUser(user);

                if (user) {
                    try {
                        const response = await fetch(
                            `${import.meta.env.VITE_API_BASE_URL}/api/users/${user.uid}`
                        );

                        if (!response.ok) {
                            throw new Error(
                                'Could not load user role'
                            );
                        }

                        const dbUser =
                            await response.json();

                        setRole(dbUser.role);

                    } catch (error) {
                        console.error(
                            'Failed to load role:',
                            error
                        );
                        setRole(null);
                    }
                } else {
                    setRole(null);
                }

                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        role,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export {
    AuthProvider,
    useAuth,
};