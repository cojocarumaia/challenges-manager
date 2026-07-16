import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import LoginForm from '../components/LoginForm';
import { auth } from '../firebase';

function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    async function handleLogin(data) {
        setError('');

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            navigate('/');
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;

                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    setError('Email or password is incorrect.');
                    break;

                case 'auth/too-many-requests':
                    setError(
                        'Too many failed attempts. Please try again later.'
                    );
                    break;

                default:
                    setError('Login failed. Please try again.');
            }
        }
    }

    return (
        <>
            {error && (
                <p className="text-danger text-center mt-3">
                    {error}
                </p>
            )}

            <LoginForm onSubmit={handleLogin} />
        </>
    );
}

export default LoginPage;