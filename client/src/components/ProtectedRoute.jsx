import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Spinner from 'react-bootstrap/Spinner';

import { auth } from '../firebase';

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner
                    animation="border"
                    role="status"
                />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;