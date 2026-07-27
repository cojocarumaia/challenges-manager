export default function getChallengeState({
    startDate,
    endDate,
    targetSteps,
    currentSteps,
}) {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (currentSteps >= targetSteps) {
        return 'finished';
    }

    if (today < start) {
        return 'upcoming';
    }

    if (today > end) {
        return 'failed';
    }

    return 'in-progress';
}