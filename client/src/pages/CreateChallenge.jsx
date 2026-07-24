import { useTranslation } from 'react-i18next';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
        imageMedium: '',
        imageThumbnail: '',
    };

    async function handleCreate(formData) {
        try {
            const challengeData = {
                ...formData,
                targetSteps: Number(
                    formData.targetSteps
                ),
            };

            await createChallenge(challengeData);

            showSuccessToast(
                t('createChallenge.success')
            );

            navigate('/');
        } catch (error) {
            console.error(error);

            window.alert(
                t('createChallenge.failed')
            );
        }
    }

    return (
        <Container
            className="py-5"
            style={{ maxWidth: '800px' }}
        >
            <div className="d-flex justify-content-end mb-4">
                <Button
                    as={Link}
                    to="/"
                    variant="outline-secondary"
                >
                    🏠 {t('navigation.home')}
                </Button>
            </div>

            <h1 className="text-center mb-4">
                {t('createChallenge.title')}
            </h1>

            <ChallengeForm
                initialValues={initialValues}
                onSubmit={handleCreate}
                submitLabel={t(
                    'createChallenge.submit'
                )}
            />
        </Container>
    );
}

export default CreateChallenge;