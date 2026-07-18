import {
    render,
    screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from 'vitest';
import { sendPasswordResetEmail } from 'firebase/auth';

import ForgotPasswordPage from './ForgotPasswordPage';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('firebase/auth', () => ({
    sendPasswordResetEmail: vi.fn(),
}));

vi.mock('../firebase', () => ({
    auth: {},
}));

vi.mock('../components/ForgotPasswordForm', () => ({
    default: ({ onSubmit, isSubmitting }) => (
        <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
                onSubmit({
                    email: 'test@example.com',
                })
            }
        >
            submit-forgot-password
        </button>
    ),
}));

describe('ForgotPasswordPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('sends a password reset email', async () => {
        const user = userEvent.setup();

        sendPasswordResetEmail.mockResolvedValue();

        render(<ForgotPasswordPage />);

        await user.click(
            screen.getByRole('button', {
                name: 'submit-forgot-password',
            })
        );

        expect(
            sendPasswordResetEmail
        ).toHaveBeenCalledWith(
            {},
            'test@example.com'
        );

        expect(
            await screen.findByText(
                'forgotPassword.success'
            )
        ).toBeInTheDocument();
    });

    test('shows an error when sending fails', async () => {
        const user = userEvent.setup();

        sendPasswordResetEmail.mockRejectedValue({
            code: 'auth/too-many-requests',
        });

        render(<ForgotPasswordPage />);

        await user.click(
            screen.getByRole('button', {
                name: 'submit-forgot-password',
            })
        );

        expect(
            await screen.findByText(
                'auth.tooManyRequests'
            )
        ).toBeInTheDocument();
    });
});