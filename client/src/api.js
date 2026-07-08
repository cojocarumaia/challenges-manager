const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchChallenges() {
    const response = await fetch(`${API_BASE_URL}/api/challenges`);

    if (!response.ok) {
        throw new Error('Failed to fetch challenges');
    }

    return response.json();
}