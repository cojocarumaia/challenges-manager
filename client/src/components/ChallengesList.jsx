import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { deleteChallenge, fetchChallenges } from '../api';
import i18n from '../i18n';

function ChallengeSkeleton() {
    return (
        <div
            className="card shadow-sm border-0 placeholder-glow"
            style={{
                borderRadius: '15px',
                overflow: 'hidden',
            }}
        >
            <div
                className="placeholder w-100"
                style={{ height: '220px' }}
            />

            <div className="card-body">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
                    <span
                        className="placeholder col-5"
                        style={{ height: '24px' }}
                    />

                    <div className="d-flex flex-wrap gap-2">
                        <span
                            className="placeholder rounded-pill"
                            style={{
                                width: '100px',
                                height: '36px',
                            }}
                        />

                        <span
                            className="placeholder rounded"
                            style={{
                                width: '70px',
                                height: '38px',
                            }}
                        />

                        <span
                            className="placeholder rounded"
                            style={{
                                width: '70px',
                                height: '38px',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChallengesList({ showSuccessToast }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [challenges, setChallenges] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');

    const observer = useRef(null);

    const loadChallenges = useCallback(
        async (pageToLoad = 1, replace = false) => {
            try {
                if (pageToLoad === 1) {
                    setLoading(true);
                } else {
                    setLoadingMore(true);
                }

                const data = await fetchChallenges(pageToLoad, 10);

                if (replace) {
                    setChallenges(data.challenges);
                } else {
                    setChallenges((currentChallenges) => [
                        ...currentChallenges,
                        ...data.challenges,
                    ]);
                }

                setHasMore(data.hasMore);
                setError('');
            } catch (err) {
                console.error(err);
                setError(t('challenges.failedToLoad'));
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [t]
    );

    useEffect(() => {
        loadChallenges(1, true);
    }, [loadChallenges]);

    useEffect(() => {
        if (page === 1) {
            return;
        }

        loadChallenges(page);
    }, [page, loadChallenges]);

    const lastChallengeRef = useCallback(
        (node) => {
            if (loading || loadingMore) {
                return;
            }

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (
                        entries[0].isIntersecting &&
                        hasMore
                    ) {
                        setPage(
                            (currentPage) =>
                                currentPage + 1
                        );
                    }
                }
            );

            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, loadingMore, hasMore]
    );

    async function handleDelete(id) {
        const confirmed = window.confirm(
            t('challenges.deleteConfirmation')
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteChallenge(id);

            showSuccessToast(
                t('challenges.deleteSuccess')
            );

            setPage(1);
            setHasMore(true);
            await loadChallenges(1, true);
        } catch (err) {
            console.error(err);
            alert(t('challenges.deleteFailed'));
        }
    }

    function changeLanguage(language) {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }

    if (loading) {
        return (
            <div
                className="container-fluid min-vh-100 py-5"
                style={{ backgroundColor: '#F8F0FF' }}
            >
                <div
                    className="card shadow-lg mx-auto border-0"
                    style={{
                        maxWidth: '800px',
                        borderRadius: '20px',
                    }}
                >
                    <div className="card-body p-4">
                        <div className="d-flex flex-column gap-3">
                            {Array.from({ length: 5 }).map(
                                (_, index) => (
                                    <ChallengeSkeleton
                                        key={index}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
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
                style={{
                    maxWidth: '800px',
                    borderRadius: '20px',
                }}
            >
                <div className="card-body p-4">
                    <div className="d-flex justify-content-end mb-3">
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-primary"
                                size="sm"
                            >
                                {i18n.language === 'ro' ? (
                                    <>
                                        <span className="fi fi-ro me-2" />
                                        {t('romanian')}
                                    </>
                                ) : (
                                    <>
                                        <span className="fi fi-gb me-2" />
                                        {t('english')}
                                    </>
                                )}
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                <Dropdown.Item
                                    onClick={() =>
                                        changeLanguage('en')
                                    }
                                >
                                    <span className="fi fi-gb me-2" />
                                    {t('english')}
                                </Dropdown.Item>

                                <Dropdown.Item
                                    onClick={() =>
                                        changeLanguage('ro')
                                    }
                                >
                                    <span className="fi fi-ro me-2" />
                                    {t('romanian')}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        <Button
                            variant="success"
                            onClick={() =>
                                navigate('/create')
                            }
                        >
                            {t('challenges.create')}
                        </Button>
                    </div>

                    <h1
                        className="text-center mb-4 fw-bold"
                        style={{ color: '#8B5CF6' }}
                    >
                        {t('challenges.title')}
                    </h1>

                    <div className="d-flex flex-column gap-3">
                        {challenges.map(
                            (challenge, index) => (
                                <div
                                    key={challenge._id}
                                    ref={
                                        index ===
                                            challenges.length - 1
                                            ? lastChallengeRef
                                            : null
                                    }
                                    className="card shadow-sm border-0"
                                    style={{
                                        borderRadius: '15px',
                                        backgroundColor:
                                            '#FFFFFF',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={
                                            challenge.image ||
                                            'https://placehold.co/800x400?text=Challenge'
                                        }
                                        alt={challenge.title}
                                        className="card-img-top"
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                            objectFit: 'cover',
                                        }}
                                    />

                                    <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
                                        <h5
                                            className="mb-0 fw-semibold"
                                            style={{
                                                color:
                                                    '#5B4B8A',
                                            }}
                                        >
                                            {challenge.title}
                                        </h5>

                                        <div className="d-flex flex-wrap align-items-center gap-2">
                                            <span
                                                className="badge rounded-pill px-3 py-2"
                                                style={{
                                                    backgroundColor:
                                                        '#C4B5FD',
                                                    color:
                                                        '#4C1D95',
                                                    fontSize:
                                                        '0.9rem',
                                                }}
                                            >
                                                {t(
                                                    'challenges.steps',
                                                    {
                                                        steps:
                                                            challenge.targetSteps,
                                                    }
                                                )}
                                            </span>

                                            <Button
                                                variant="warning"
                                                onClick={() =>
                                                    navigate(
                                                        `/edit/${challenge._id}`
                                                    )
                                                }
                                            >
                                                {t(
                                                    'challenges.edit'
                                                )}
                                            </Button>

                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleDelete(
                                                        challenge._id
                                                    )
                                                }
                                            >
                                                {t(
                                                    'challenges.delete'
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                        {loadingMore && (
                            <>
                                <ChallengeSkeleton />
                                <ChallengeSkeleton />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengesList;