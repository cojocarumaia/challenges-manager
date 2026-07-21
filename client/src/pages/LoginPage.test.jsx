import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import {
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from 'vitest';

import { signInWithEmailAndPassword } from 'firebase/auth';

import LoginPage from './LoginPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual(
        'react-router-dom'
    );

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: vi.fn(),
}));

vi.mock('../firebase', () => ({
    auth: {},
}));

vi.mock('../components/LoginForm', () => ({
    default: ({ onSubmit }) => (
        <button
            type="button"
            onClick={() =>
                onSubmit({
                    email: 'test@example.com',
                    password: '123456',
                })
            }
        >
            submit-login
        </button>
    ),
}));

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('logs in and navigates to the home page', async () => {
        const user = userEvent.setup();

        signInWithEmailAndPassword.mockResolvedValue({
            user: {},
        });

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        await user.click(
            screen.getByRole('button', {
                name: 'submit-login',
            })
        );

        expect(
            signInWithEmailAndPassword
        ).toHaveBeenCalledWith(
            {},
            'test@example.com',
            '123456'
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('shows an error for invalid credentials', async () => {
        const user = userEvent.setup();

        signInWithEmailAndPassword.mockRejectedValue({
            code: 'auth/invalid-credential',
        });

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        await user.click(
            screen.getByRole('button', {
                name: 'submit-login',
            })
        );

        expect(
            await screen.findByText(
                'auth.invalidCredentials'
            )
        ).toBeInTheDocument();

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});