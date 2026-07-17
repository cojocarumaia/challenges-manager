import {
    render,
    screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import ForgotPasswordPage from './ForgotPasswordPage';
import { sendPasswordResetEmail } from 'firebase/auth';

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

describe('ForgotPasswordPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('sends a password reset email', async () => {
        const user = userEvent.setup();

        sendPasswordResetEmail.mockResolvedValue();

        render(<ForgotPasswordPage />);

        await user.type(
            screen.getByLabelText(
                'forgotPassword.email'
            ),
            'test@example.com'
        );

        await user.click(
            screen.getByRole('button', {
                name: 'forgotPassword.submit',
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

    test('shows an error for an invalid email', async () => {
        const user = userEvent.setup();

        render(<ForgotPasswordPage />);

        await user.type(
            screen.getByLabelText(
                'forgotPassword.email'
            ),
            'test@example'
        );

        await user.click(
            screen.getByRole('button', {
                name: 'forgotPassword.submit',
            })
        );

        expect(
            await screen.findByText(
                'auth.invalidEmail'
            )
        ).toBeInTheDocument();

        expect(
            sendPasswordResetEmail
        ).not.toHaveBeenCalled();
    });
});