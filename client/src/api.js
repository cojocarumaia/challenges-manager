import { auth } from './firebase';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

async function getAuthHeaders() {
    const user = auth.currentUser;

    if (!user) {
        throw new Error(
            'User is not authenticated'
        );
    }

    const token = await user.getIdToken();

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

export async function fetchChallenges(
    page = 1,
    limit = 10
) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error(
            'Failed to fetch challenges'
        );
    }

    return response.json();
}
export async function fetchMyParticipations() {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API_BASE_URL}/api/challenges/participations/me`,
        {
            headers,
        }
    );

    if (!response.ok) {
        throw new Error(
            'Failed to fetch participations'
        );
    }

    return response.json();
}

export async function joinChallenge(challengeId) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${challengeId}/join`,
        {
            method: 'POST',
            headers,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            errorData.message ||
            'Failed to join challenge'
        );
    }

    return response.json();
}
export async function fetchChallenge(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${id}`
    );

    if (!response.ok) {
        throw new Error(
            'Failed to fetch challenge'
        );
    }

    return response.json();
}

export async function createChallenge(
    challengeData
) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API_BASE_URL}/api/challenges`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(
                challengeData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            'Failed to create challenge'
        );
    }

    return response.json();
}

export async function updateChallenge(
    id,
    challengeData
) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${id}`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify(
                challengeData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            'Failed to update challenge'
        );
    }

    return response.json();
}

export async function deleteChallenge(id) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API_BASE_URL}/api/challenges/${id}`,
        {
            method: 'DELETE',
            headers,
        }
    );

    if (!response.ok) {
        throw new Error(
            'Failed to delete challenge'
        );
    }
}

export async function createUserProfile({
    firebaseUid,
    email,
}) {
    const headers = await getAuthHeaders();

    const response = await fetch(
        `${API_BASE_URL}/api/users`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                firebaseUid,
                email,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            'User profile could not be saved.'
        );
    }

    return response.json();
}

export async function fetchUserProfile(
    firebaseUid
) {
    const response = await fetch(
        `${API_BASE_URL}/api/users/${firebaseUid}`
    );

    if (!response.ok) {
        throw new Error(
            'User profile could not be loaded.'
        );
    }

    return response.json();
}