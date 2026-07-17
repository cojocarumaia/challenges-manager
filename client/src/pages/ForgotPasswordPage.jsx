import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendPasswordResetEmail } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { auth } from '../firebase';

function ForgotPasswordPage() {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');
        setSuccess('');

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError(t('auth.invalidEmail'));
            return;
        }

        try {
            setIsSubmitting(true);

            await sendPasswordResetEmail(auth, email);

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
        <Card
            className="mx-auto mt-4"
            style={{ maxWidth: '450px' }}
        >
            <Card.Body>
                <h2 className="text-center mb-4">
                    {t('forgotPassword.title')}
                </h2>

                <p className="text-center">
                    {t('forgotPassword.description')}
                </p>

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

                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-4"
                        controlId="forgot-password-email"
                    >
                        <Form.Label>
                            {t('forgotPassword.email')}
                        </Form.Label>

                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? t(
                                'forgotPassword.sending'
                            )
                            : t(
                                'forgotPassword.submit'
                            )}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ForgotPasswordPage;