import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendPasswordResetEmail } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { auth } from '../firebase';

function ForgotPasswordPage() {
    const { t } = useTranslation();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(data) {
        setError('');
        setSuccess('');

        try {
            setIsSubmitting(true);

            await sendPasswordResetEmail(
                auth,
                data.email
            );

            setSuccess(
                t('forgotPassword.success')
            );
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError(t('auth.invalidEmail'));
                    break;

                case 'auth/too-many-requests':
                    setError(t('auth.tooManyRequests'));
                    break;

                default:
                    setError(
                        t('forgotPassword.failed')
                    );
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container className="py-4">
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {success && (
                <Alert variant="success">
                    {success}
                </Alert>
            )}

            <ForgotPasswordForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </Container>
    );
}

export default ForgotPasswordPage;