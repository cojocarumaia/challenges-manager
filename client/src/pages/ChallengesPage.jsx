import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import ChallengesList from '../components/ChallengesList';
import { auth } from '../firebase';

function ChallengesPage({ showSuccessToast }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    async function handleLogout() {
        setError('');

        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setError(t('auth.logoutFailed'));
        }
    }

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-end mb-3">
                <Button
                    type="button"
                    variant="outline-danger"
                    onClick={handleLogout}
                >
                    {t('auth.logout')}
                </Button>
            </div>

            {error && (
                <Alert
                    variant="danger"
                    className="text-center"
                >
                    {error}
                </Alert>
            )}

            <ChallengesList
                showSuccessToast={showSuccessToast}
            />
        </Container>
    );
}

export default ChallengesPage;