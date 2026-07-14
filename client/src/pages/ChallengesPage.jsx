import ChallengesList from '../components/ChallengesList';

function ChallengesPage({
    showSuccessToast,
    theme,
}) {
    return (
        <ChallengesList
            showSuccessToast={showSuccessToast}
            theme={theme}
        />
    );
}

export default ChallengesPage;