import { useNavigate } from 'react-router-dom';
import ChallengeForm from '../components/ChallengeForm';
import { createChallenge } from '../api';

function CreateChallenge({ showSuccessToast }) {
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
            showSuccessToast('Challenge created successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to create challenge.');
        }
    }

    return (
        <div className="container py-5">
            <h1 className="mb-4">Create Challenge</h1>

            <ChallengeForm
                initialValues={initialValues}
                onSubmit={handleCreate}
                submitLabel="Create"
            />
        </div>
    );
}

export default CreateChallenge;