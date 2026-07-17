import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import RegisterPage from './RegisterPage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: vi.fn(),
}));

vi.mock('../firebase', () => ({
    auth: {},
}));

vi.mock('../components/RegisterForm', () => ({
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
            submit-register
        </button>
    ),
}));

describe('RegisterPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('registers the user and navigates to the home page', async () => {
        const user = userEvent.setup();

        createUserWithEmailAndPassword.mockResolvedValue({
            user: {},
        });

        render(<RegisterPage />);

        await user.click(
            screen.getByRole('button', {
                name: 'submit-register',
            })
        );

        expect(
            createUserWithEmailAndPassword
        ).toHaveBeenCalledWith(
            {},
            'test@example.com',
            '123456'
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('shows an error when the email is already in use', async () => {
        const user = userEvent.setup();

        createUserWithEmailAndPassword.mockRejectedValue({
            code: 'auth/email-already-in-use',
        });

        render(<RegisterPage />);

        await user.click(
            screen.getByRole('button', {
                name: 'submit-register',
            })
        );

        expect(
            await screen.findByText(
                'auth.emailAlreadyInUse'
            )
        ).toBeInTheDocument();

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});