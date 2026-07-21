import {
    render,
    screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from 'vitest';

import ChallengesList from './ChallengesList';
import { fetchChallenges } from '../api';
import { useAuth } from '../context/AuthContext';

const mockTranslate = vi.fn(
    (key, options) => {
        if (
            key === 'challenges.steps' &&
            options?.steps
        ) {
            return `${options.steps} steps`;
        }

        return key;
    }
);

class IntersectionObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

global.IntersectionObserver =
    IntersectionObserverMock;

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: mockTranslate,
    }),
}));

vi.mock('../i18n', () => ({
    default: {
        language: 'en',
        changeLanguage: vi.fn(),
    },
}));

vi.mock('../api', () => ({
    fetchChallenges: vi.fn(),
    deleteChallenge: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

describe('ChallengesList', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        useAuth.mockReturnValue({
            currentUser: {
                uid: 'user-id',
                email: 'user@example.com',
            },
            role: 'user',
            loading: false,
        });

        fetchChallenges.mockResolvedValue({
            challenges: [
                {
                    _id: 'challenge-1',
                    title: 'Walking challenge',
                    targetSteps: 10000,
                    startDate: '2026-07-01',
                    endDate: '2026-07-10',
                    image: '',
                },
            ],
            hasMore: false,
        });
    });

    test('hides admin controls for an ordinary user', async () => {
        render(
            <MemoryRouter>
                <ChallengesList
                    showSuccessToast={vi.fn()}
                />
            </MemoryRouter>
        );

        expect(
            await screen.findByText(
                '#1 Walking challenge'
            )
        ).toBeInTheDocument();

        expect(
            fetchChallenges
        ).toHaveBeenCalledWith(1, 10);

        expect(
            screen.queryByRole('button', {
                name: 'challenges.create',
            })
        ).not.toBeInTheDocument();

        expect(
            screen.queryByRole('button', {
                name: 'challenges.delete',
            })
        ).not.toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: 'challenges.edit',
            })
        ).toBeInTheDocument();
    });
});