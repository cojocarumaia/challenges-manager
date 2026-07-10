import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

import { fetchChallenges, deleteChallenge } from '../api';

function ChallengesList({ showSuccessToast }) {
    const { t } = useTranslation();

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function loadChallenges() {
        try {
            const data = await fetchChallenges();
            setChallenges(data);
        } catch (err) {
            console.error(err);
            setError(t('challenges.failedToLoad'));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadChallenges();
    }, []);

    async function handleDelete(id) {
        const confirmed = window.confirm(
            t('challenges.deleteConfirmation')
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteChallenge(id);
            showSuccessToast(t('challenges.deleteSuccess'));
            loadChallenges();
        } catch (err) {
            console.error(err);
            alert(t('challenges.deleteFailed'));
        }
    }

    if (loading) {
        return <p>{t('challenges.loading')}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div
            className="container-fluid min-vh-100 py-5"
            style={{ backgroundColor: '#F8F0FF' }}
        >
            <div
                className="card shadow-lg mx-auto border-0"
                style={{ maxWidth: '800px', borderRadius: '20px' }}
            >
                <div className="card-body p-4">
                    <h1
                        className="text-center mb-4 fw-bold"
                        style={{ color: '#8B5CF6' }}
                    >
                        {t('challenges.title')}
                    </h1>

                    <ul className="list-group">
                        {challenges.map((challenge) => (
                            <li
                                key={challenge._id}
                                className="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom py-3"
                            >
                                <h5
                                    className="mb-0 fw-semibold"
                                    style={{ color: '#5B4B8A' }}
                                >
                                    {challenge.title}
                                </h5>

                                <div className="d-flex align-items-center gap-3">
                                    <span
                                        className="badge rounded-pill px-3 py-2"
                                        style={{
                                            backgroundColor: '#C4B5FD',
                                            color: '#4C1D95',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {t('challenges.steps', {
                                            steps: challenge.targetSteps,
                                        })}
                                    </span>

                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(challenge._id)}
                                    >
                                        {t('challenges.delete')}
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ChallengesList;