import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ChallengeForm from '../components/ChallengeForm';
import { fetchChallenge, updateChallenge } from '../api';

function EditChallenge({ showSuccessToast }) {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadChallenge() {
            try {
                const challenge = await fetchChallenge(id);

                setInitialValues({
                    title: challenge.title || '',
                    description: challenge.description || '',
                    targetSteps: challenge.targetSteps || '',
                    startDate: challenge.startDate
                        ? challenge.startDate.slice(0, 10)
                        : '',
                    endDate: challenge.endDate
                        ? challenge.endDate.slice(0, 10)
                        : '',
                    image: challenge.image || '',
                });
            } catch (error) {
                console.error(error);
                setError(t('editChallenge.failedToLoad'));
            } finally {
                setLoading(false);
            }
        }

        loadChallenge();
    }, [id, t]);

    async function handleUpdate(formData) {
        try {
            const challengeData = {
                ...formData,
                targetSteps: Number(formData.targetSteps),
            };

            await updateChallenge(id, challengeData);
            showSuccessToast(t('editChallenge.success'));
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(t('editChallenge.failed'));
        }
    }

    if (loading) {
        return <p>{t('editChallenge.loading')}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container py-5" style={{ maxWidth: '800px' }}>
            <h1 className="mb-4">{t('editChallenge.title')}</h1>

            <ChallengeForm
                initialValues={initialValues}
                onSubmit={handleUpdate}
                submitLabel={t('editChallenge.submit')}
            />
        </div>
    );
}

export default EditChallenge;