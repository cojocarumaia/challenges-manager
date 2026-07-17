import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';

import LoginForm from '../components/LoginForm';
import { auth } from '../firebase';

function LoginPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    setError(t('auth.invalidEmail'));
                    break;

                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    setError(t('auth.invalidCredentials'));
                    break;

                case 'auth/too-many-requests':
                    setError(t('auth.tooManyRequests'));
                    break;

                default:
                    setError(t('auth.loginFailed'));
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

            <LoginForm onSubmit={handleLogin} />
        </>
    );
}

export default LoginPage;