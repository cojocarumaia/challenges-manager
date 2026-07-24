import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import { fetchChallenge } from '../api';

function ChallengeDetailsPage() {
    const { id } = useParams();
    const { t } = useTranslation();

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadChallenge() {
            try {
                const data = await fetchChallenge(id);
                setChallenge(data);
            } catch (err) {
                console.error(err);
                setError(t('challengeDetails.failedToLoad'));
            } finally {
                setLoading(false);
            }
        }

        loadChallenge();
    }, [id, t]);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error || !challenge) {
        return (
            <Container className="py-5 text-center">
                <p>{error}</p>

                <Button as={Link} to="/" variant="secondary">
                    {t('challengeDetails.back')}
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Card className="shadow-sm mx-auto">
                <Card.Img
                    variant="top"
                    src={
                        challenge.image ||
                        'https://placehold.co/1200x800?text=Challenge'
                    }
                    alt={challenge.title}
                    style={{
                        width: '100%',
                        maxHeight: '75vh',
                        objectFit: 'contain',
                    }}
                />

                <Card.Body>
                    <Card.Title>{challenge.title}</Card.Title>

                    <Card.Text>
                        {challenge.description}
                    </Card.Text>

                    <p>
                        <strong>
                            {t('challengeDetails.targetSteps')}:
                        </strong>{' '}
                        {challenge.targetSteps}
                    </p>

                    <Button as={Link} to="/" variant="secondary">
                        {t('challengeDetails.back')}
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ChallengeDetailsPage;