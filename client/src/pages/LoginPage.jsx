import { useState } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
                    setError(
                        t('auth.invalidCredentials')
                    );
                    break;

                case 'auth/too-many-requests':
                    setError(
                        t('auth.tooManyRequests')
                    );
                    break;

                default:
                    setError(t('auth.loginFailed'));
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

                    <LoginForm
                        onSubmit={handleLogin}
                    />

                    <div className="text-center mt-3">
                        <Link to="/forgot-password">
                            {t(
                                'login.forgotPassword'
                            )}
                        </Link>
                    </div>

                    <div className="text-center mt-2">
                        <span>
                            {t(
                                'login.noAccount'
                            )}{' '}
                        </span>

                        <Link to="/register">
                            {t(
                                'login.register'
                            )}
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;