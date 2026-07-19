import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import {
    isValidEmail,
    isValidPassword,
} from '../utils/validation';

function RegisterForm({ onSubmit }) {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!isValidEmail(email)) {
            setError(t('auth.invalidEmail'));
            return;
        }

        if (!isValidPassword(password)) {
            setError(t('auth.passwordTooShort'));
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
                    {t('register.title')}
                </h2>

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="register-email"
                    >
                        <Form.Label>
                            {t('register.email')}
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

                    <Form.Group
                        className="mb-4"
                        controlId="register-password"
                    >
                        <Form.Label>
                            {t('register.password')}
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
                        {t('register.submit')}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default RegisterForm;