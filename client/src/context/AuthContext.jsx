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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setCurrentUser(user);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
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