import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import ForgotPasswordForm from './ForgotPasswordForm';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('ForgotPasswordForm', () => {
    test('shows the email field and submit button', () => {
        render(
            <ForgotPasswordForm
                onSubmit={vi.fn()}
                isSubmitting={false}
            />
        );

        expect(
            screen.getByLabelText(
                'forgotPassword.email'
            )
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: 'forgotPassword.submit',
            })
        ).toBeInTheDocument();
    });

    test('refuses an empty submission', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(
            <ForgotPasswordForm
                onSubmit={onSubmit}
                isSubmitting={false}
            />
        );

        await user.click(
            screen.getByRole('button', {
                name: 'forgotPassword.submit',
            })
        );

        expect(onSubmit).not.toHaveBeenCalled();
    });
});