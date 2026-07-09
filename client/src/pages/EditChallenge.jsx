import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ChallengeForm from '../components/ChallengeForm';
import { fetchChallenge, updateChallenge } from '../api';

function EditChallenge() {
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
                });
            } catch (error) {
                console.error(error);
                setError('Failed to load challenge.');
            } finally {
                setLoading(false);
            }
        }

        loadChallenge();
    }, [id]);

    async function handleUpdate(formData) {
        try {
            const challengeData = {
                ...formData,
                targetSteps: Number(formData.targetSteps),
            };

            await updateChallenge(id, challengeData);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to update challenge.');
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container py-5">
            <h1 className="mb-4">Edit Challenge</h1>

            <ChallengeForm
                initialValues={initialValues}
                onSubmit={handleUpdate}
                submitLabel="Update"
            />
        </div>
    );
}

export default EditChallenge;