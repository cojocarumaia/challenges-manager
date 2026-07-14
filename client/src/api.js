const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchChallenges(page = 1, limit = 10) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch challenges');
    }

    return response.json();
}

export async function fetchChallenge(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${id}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch challenge');
    }

    return response.json();
}

export async function createChallenge(challengeData) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(challengeData),
        }
    );

    if (!response.ok) {
        throw new Error('Failed to create challenge');
    }

    return response.json();
}

export async function updateChallenge(id, challengeData) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(challengeData),
        }
    );

    if (!response.ok) {
        throw new Error('Failed to update challenge');
    }

    return response.json();
}

export async function deleteChallenge(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${id}`,
        {
            method: 'DELETE',
        }
    );

    if (!response.ok) {
        throw new Error('Failed to delete challenge');
    }
}