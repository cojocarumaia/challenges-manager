import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import RegisterForm from '../components/RegisterForm';
import { auth } from '../firebase';

function RegisterPage() {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    async function handleRegister(data) {
        setError('');

        try {
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            navigate('/');
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email is already in use.');
                    break;

                case 'auth/weak-password':
                    setError('Password must contain at least 6 characters.');
                    break;

                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;

                default:
                    setError('Registration failed. Please try again.');
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

            <RegisterForm
                onSubmit={handleRegister}
            />
        </>
    );
}

export default RegisterPage;