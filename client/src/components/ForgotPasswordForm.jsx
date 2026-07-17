import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function ForgotPasswordForm({
    onSubmit,
    isSubmitting,
}) {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError(t('auth.invalidEmail'));
            return;
        }

        onSubmit({
            email,
        });
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
                    <p className="text-danger text-center">
                        {error}
                    </p>
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
                            ? t('forgotPassword.sending')
                            : t('forgotPassword.submit')}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ForgotPasswordForm;