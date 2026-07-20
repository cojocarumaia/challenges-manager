import { useState } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import RegisterForm from '../components/RegisterForm';
import { auth } from '../firebase';

function RegisterPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [error, setError] = useState('');

    async function handleRegister(data) {
        setError('');

        try {
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        firebaseUid:
                            userCredential.user.uid,
                        email:
                            userCredential.user.email,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    'User profile could not be saved.'
                );
            }

            navigate('/');
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError(
                        t('auth.registrationFailed')
                    );
                    break;

                case 'auth/weak-password':
                    setError(
                        t('auth.passwordTooShort')
                    );
                    break;

                case 'auth/invalid-email':
                    setError(
                        t('auth.invalidEmail')
                    );
                    break;

                default:
                    setError(
                        t('auth.registrationFailed')
                    );
            }
        }
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col
                    xs={12}
                    sm={10}
                    md={7}
                    lg={5}
                    xl={4}
                >
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    <RegisterForm
                        onSubmit={handleRegister}
                    />

                    <div className="text-center mt-3">
                        <span>
                            {t(
                                'register.alreadyHaveAccount'
                            )}{' '}
                        </span>

                        <Link to="/login">
                            {t(
                                'register.login'
                            )}
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;