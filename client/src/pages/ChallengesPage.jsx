import Container from 'react-bootstrap/Container';

import ChallengesList from '../components/ChallengesList';

function ChallengesPage({
    showSuccessToast,
}) {
    return (
        <Container className="py-4">
            <ChallengesList
                showSuccessToast={
                    showSuccessToast
                }
            />
        </Container>
    );
}

export default ChallengesPage;