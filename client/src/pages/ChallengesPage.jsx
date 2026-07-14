import ChallengesList from '../components/ChallengesList';

function ChallengesPage({ showSuccessToast }) {
    return (
        <ChallengesList
            showSuccessToast={showSuccessToast}
        />
    );
}

export default ChallengesPage;