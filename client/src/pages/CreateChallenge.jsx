import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ChallengeForm from '../components/ChallengeForm';
import { createChallenge } from '../api';

function CreateChallenge({ showSuccessToast }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        description: '',
        targetSteps: '',
        startDate: '',
        endDate: '',
    };

    async function handleCreate(formData) {
        try {
            const challengeData = {
                ...formData,
                targetSteps: Number(formData.targetSteps),
            };

            await createChallenge(challengeData);
            showSuccessToast(t('createChallenge.success'));
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(t('createChallenge.failed'));
        }
    }

    return (
        <div className="container py-5">
            <h1 className="mb-4">{t('createChallenge.title')}</h1>

            <ChallengeForm
                initialValues={initialValues}
                onSubmit={handleCreate}
                submitLabel={t('createChallenge.submit')}
            />
        </div>
    );
}

export default CreateChallenge;