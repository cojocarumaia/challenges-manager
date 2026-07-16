import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function LoginForm({ onSubmit }) {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError(
                'Password must contain at least 6 characters.'
            );
            return;
        }

        onSubmit({
            email,
            password,
        });
    }

    return (
        <Card
            className="mx-auto mt-4"
            style={{ maxWidth: '450px' }}
        >
            <Card.Body>
                <h2 className="text-center mb-4">
                    {t('login.title')}
                </h2>

                {error && (
                    <p className="text-danger text-center">
                        {error}
                    </p>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            {t('login.email')}
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

                    <Form.Group className="mb-4">
                        <Form.Label>
                            {t('login.password')}
                        </Form.Label>

                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100"
                    >
                        {t('login.submit')}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LoginForm;