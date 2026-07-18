import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';

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
                    setError(t('auth.registrationFailed'));
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
                <Alert
                    variant="danger"
                    className="mt-3"
                >
                    {error}
                </Alert>
            )}

            <RegisterForm
                onSubmit={handleRegister}
            />
        </>
    );
}

export default RegisterPage;