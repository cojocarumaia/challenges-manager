import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ChallengeImage from './ChallengeImage';

import {
    deleteChallenge,
    fetchChallenges,
    fetchMyParticipations,
    joinChallenge,
    sendSteps,
} from '../api';
import i18n from '../i18n';

function ChallengeSkeleton() {
    return (
        <Card
            className="shadow-sm border-0 placeholder-glow bg-body"
            style={{
                borderRadius: '15px',
                overflow: 'hidden',
            }}
        >
            <div
                className="placeholder w-100"
                style={{ height: '220px' }}
            />

            <Card.Body>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
                    <div className="d-flex flex-column gap-2">
                        <span
                            className="placeholder col-8"
                            style={{
                                height: '24px',
                            }}
                        />

                        <span
                            className="placeholder col-6"
                            style={{
                                height: '18px',
                            }}
                        />
                    </div>

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
                                width: '45px',
                                height: '38px',
                            }}
                        />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

function formatChallengeDate(date) {
    if (!date) {
        return '';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return '';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
    }).format(parsedDate);
}

function ChallengesList({ showSuccessToast }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role, currentUser } = useAuth();

    const [challenges, setChallenges] = useState([]);
    const [joinedChallengeIds, setJoinedChallengeIds] =
        useState([]);
    const [joiningChallengeId, setJoiningChallengeId] =
        useState(null);
    const [stepsByChallenge, setStepsByChallenge] =
        useState({});

    const [sendingStepsChallengeId, setSendingStepsChallengeId] =
        useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] =
        useState(false);
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

                const data = await fetchChallenges(
                    pageToLoad,
                    10
                );

                if (replace) {
                    setChallenges(
                        data.challenges
                    );
                } else {
                    setChallenges(
                        (currentChallenges) => [
                            ...currentChallenges,
                            ...data.challenges,
                        ]
                    );
                }

                setHasMore(data.hasMore);
                setError('');
            } catch (err) {
                console.error(err);

                setError(
                    t(
                        'challenges.failedToLoad'
                    )
                );
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
        async function loadParticipations() {
            if (!currentUser) {
                setJoinedChallengeIds([]);
                return;
            }

            try {
                const participations =
                    await fetchMyParticipations();

                setJoinedChallengeIds(
                    participations.map(
                        (participation) =>
                            participation.challenge
                    )
                );
            } catch (err) {
                console.error(err);
            }
        }

        loadParticipations();
    }, [currentUser]);

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

            observer.current =
                new IntersectionObserver(
                    (entries) => {
                        if (
                            entries[0]
                                .isIntersecting &&
                            hasMore
                        ) {
                            setPage(
                                (
                                    currentPage
                                ) =>
                                    currentPage +
                                    1
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
    async function handleJoin(challengeId) {
        try {
            setJoiningChallengeId(challengeId);

            await joinChallenge(challengeId);

            setJoinedChallengeIds(
                (currentIds) => [
                    ...currentIds,
                    challengeId,
                ]
            );

            showSuccessToast(
                t('challenges.joinSuccess')
            );
        } catch (err) {
            console.error(err);

            if (err.message === 'Already joined') {
                setJoinedChallengeIds(
                    (currentIds) =>
                        currentIds.includes(challengeId)
                            ? currentIds
                            : [
                                ...currentIds,
                                challengeId,
                            ]
                );

                return;
            }

            window.alert(
                t('challenges.joinFailed')
            );
        } finally {
            setJoiningChallengeId(null);
        }
    }
    async function handleSendSteps(challengeId) {
        const steps = Number(
            stepsByChallenge[challengeId]
        );

        if (!steps || steps <= 0) {
            window.alert(
                t('challenges.stepsMustBePositive')
            );
            return;
        }

        try {
            setSendingStepsChallengeId(
                challengeId
            );

            await sendSteps(challengeId, steps);

            setStepsByChallenge(
                (currentValues) => ({
                    ...currentValues,
                    [challengeId]: '',
                })
            );

            showSuccessToast(
                t('challenges.stepsSent')
            );
        } catch (err) {
            console.error(err);

            window.alert(
                t('challenges.stepsSendFailed')
            );
        } finally {
            setSendingStepsChallengeId(null);
        }
    }
    async function handleDelete(id) {
        const confirmed = window.confirm(
            t(
                'challenges.deleteConfirmation'
            )
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteChallenge(id);

            showSuccessToast(
                t(
                    'challenges.deleteSuccess'
                )
            );

            setPage(1);
            setHasMore(true);

            await loadChallenges(1, true);
        } catch (err) {
            console.error(err);

            window.alert(
                t(
                    'challenges.deleteFailed'
                )
            );
        }
    }

    function changeLanguage(language) {
        i18n.changeLanguage(language);

        localStorage.setItem(
            'language',
            language
        );
    }

    if (loading) {
        return (
            <Container
                fluid
                className="min-vh-100 py-5 bg-body-tertiary"
            >
                <Card
                    className="shadow-lg mx-auto border-0 bg-body"
                    style={{
                        maxWidth: '800px',
                        borderRadius: '20px',
                    }}
                >
                    <Card.Body className="p-4">
                        <div className="d-flex flex-column gap-3">
                            {Array.from({
                                length: 5,
                            }).map((_, index) => (
                                <ChallengeSkeleton
                                    key={index}
                                />
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    if (error) {
        return (
            <Container
                fluid
                className="min-vh-100 py-5 bg-body-tertiary"
            >
                <Alert
                    variant="danger"
                    className="mx-auto"
                    style={{
                        maxWidth: '800px',
                    }}
                >
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container
            fluid
            className="min-vh-100 py-5 bg-body-tertiary"
        >
            <Card
                className="shadow-lg mx-auto border-0 bg-body"
                style={{
                    maxWidth: '800px',
                    borderRadius: '20px',
                }}
            >
                <Card.Body className="p-4">
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

                    {role === 'admin' && (
                        <div className="d-flex justify-content-center mb-4">
                            <Button
                                variant="success"
                                onClick={() => navigate('/create')}
                            >
                                {t('challenges.create')}
                            </Button>
                        </div>
                    )}

                    <h1 className="text-center mb-4 fw-bold text-primary">
                        {t('challenges.title')}
                    </h1>

                    <div className="d-flex flex-column gap-3">
                        {challenges.map(
                            (challenge, index) => {
                                const startDate =
                                    formatChallengeDate(
                                        challenge.startDate
                                    );

                                const endDate =
                                    formatChallengeDate(
                                        challenge.endDate
                                    );

                                const hasDateRange =
                                    startDate &&
                                    endDate;

                                return (
                                    <Card
                                        key={
                                            challenge._id
                                        }
                                        ref={
                                            index ===
                                                challenges.length -
                                                1
                                                ? lastChallengeRef
                                                : null
                                        }
                                        className="shadow-sm border-0 bg-body"
                                        style={{
                                            borderRadius:
                                                '15px',
                                            overflow:
                                                'hidden',
                                        }}
                                    >
                                        <ChallengeImage
                                            src={challenge.imageThumbnail}
                                            alt={challenge.title}
                                        />                                     <Card.Body className="d-flex flex-column">
                                            <div>
                                                <Card.Title
                                                    as="h5"
                                                    className="mb-1 fw-semibold text-primary"
                                                >
                                                    #
                                                    {index + 1}{' '}
                                                    {
                                                        challenge.title
                                                    }
                                                </Card.Title>

                                                {hasDateRange && (
                                                    <Card.Text className="mb-0 text-body-secondary">
                                                        {
                                                            startDate
                                                        }{' '}
                                                        -{' '}
                                                        {
                                                            endDate
                                                        }
                                                    </Card.Text>
                                                )}
                                            </div>

                                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
                                                <Badge
                                                    pill
                                                    bg="primary-subtle"
                                                    text="primary-emphasis"
                                                    className="px-3 py-2 fs-6"
                                                >
                                                    {t(
                                                        'challenges.steps',
                                                        {
                                                            steps:
                                                                challenge.targetSteps,
                                                        }
                                                    )}
                                                </Badge>

                                                <div className="d-flex gap-2 ms-auto">
                                                    {currentUser && (
                                                        <Button
                                                            type="button"
                                                            variant={
                                                                joinedChallengeIds.includes(
                                                                    challenge._id
                                                                )
                                                                    ? 'success'
                                                                    : 'outline-success'
                                                            }
                                                            disabled={
                                                                joinedChallengeIds.includes(
                                                                    challenge._id
                                                                ) ||
                                                                joiningChallengeId ===
                                                                challenge._id
                                                            }
                                                            onClick={() =>
                                                                handleJoin(challenge._id)
                                                            }
                                                        >
                                                            {joiningChallengeId ===
                                                                challenge._id
                                                                ? t('challenges.joining')
                                                                : joinedChallengeIds.includes(
                                                                    challenge._id
                                                                )
                                                                    ? t('challenges.joined')
                                                                    : t('challenges.join')}
                                                        </Button>
                                                    )}
                                                    {joinedChallengeIds.includes(
                                                        challenge._id
                                                    ) && (
                                                            <div className="d-flex gap-2">
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    className="form-control"
                                                                    style={{ width: '120px' }}
                                                                    placeholder={t(
                                                                        'challenges.stepsPlaceholder'
                                                                    )}
                                                                    value={
                                                                        stepsByChallenge[
                                                                        challenge._id
                                                                        ] || ''
                                                                    }
                                                                    onChange={(event) =>
                                                                        setStepsByChallenge(
                                                                            (currentValues) => ({
                                                                                ...currentValues,
                                                                                [challenge._id]:
                                                                                    event.target.value,
                                                                            })
                                                                        )
                                                                    }
                                                                />

                                                                <Button
                                                                    type="button"
                                                                    variant="primary"
                                                                    disabled={
                                                                        sendingStepsChallengeId ===
                                                                        challenge._id
                                                                    }
                                                                    onClick={() =>
                                                                        handleSendSteps(
                                                                            challenge._id
                                                                        )
                                                                    }
                                                                >
                                                                    {sendingStepsChallengeId ===
                                                                        challenge._id
                                                                        ? t(
                                                                            'challenges.sendingSteps'
                                                                        )
                                                                        : t(
                                                                            'challenges.sendSteps'
                                                                        )}
                                                                </Button>
                                                            </div>
                                                        )}
                                                    <Button
                                                        type="button"
                                                        variant="outline-primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/challenges/${challenge._id}`
                                                            )
                                                        }
                                                    >
                                                        {t('challenges.details')}
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="warning"
                                                        onClick={() =>
                                                            navigate(
                                                                `/edit/${challenge._id}`
                                                            )
                                                        }
                                                    >
                                                        {t('challenges.edit')}
                                                    </Button>

                                                    {role === 'admin' && (
                                                        <Button
                                                            type="button"
                                                            variant="danger"
                                                            onClick={() =>
                                                                handleDelete(challenge._id)
                                                            }
                                                            aria-label={t(
                                                                'challenges.delete'
                                                            )}
                                                            title={t(
                                                                'challenges.delete'
                                                            )}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrashCan}
                                                            />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                );
                            }
                        )}

                        {loadingMore && (
                            <>
                                <ChallengeSkeleton />
                                <ChallengeSkeleton />
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container >
    );
}

export default ChallengesList;