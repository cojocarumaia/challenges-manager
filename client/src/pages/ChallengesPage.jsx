import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import ChallengesList from '../components/ChallengesList';
import { auth } from '../firebase';

function ChallengesPage({ showSuccessToast }) {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    async function handleLogout() {
        setError('');

        try {
            await signOut(auth);
            navigate('/login');
        } catch {
            setError('Log out failed. Please try again.');
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
                    Log out
                </Button>
            </div>

            {error && (
                <p className="text-danger text-center">
                    {error}
                </p>
            )}

            <ChallengesList
                showSuccessToast={showSuccessToast}
            />
        </Container>
    );
}

export default ChallengesPage;