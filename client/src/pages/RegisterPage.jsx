import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import RegisterForm from '../components/RegisterForm';
import { auth } from '../firebase';

function RegisterPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    setError(t('auth.emailAlreadyInUse'));
                    break;

                case 'auth/weak-password':
                    setError(t('auth.passwordTooShort'));
                    break;

                case 'auth/invalid-email':
                    setError(t('auth.invalidEmail'));
                    break;

                default:
                    setError(t('auth.registrationFailed'));
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