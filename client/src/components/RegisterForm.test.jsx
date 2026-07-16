import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import RegisterForm from './RegisterForm';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('RegisterForm', () => {
    test('shows the email and password fields', () => {
        render(<RegisterForm onSubmit={vi.fn()} />);

        expect(
            screen.getByLabelText('register.email')
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText('register.password')
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: 'register.submit',
            })
        ).toBeInTheDocument();
    });

    test('refuses an empty submission', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<RegisterForm onSubmit={onSubmit} />);

        await user.click(
            screen.getByRole('button', {
                name: 'register.submit',
            })
        );

        expect(onSubmit).not.toHaveBeenCalled();
    });
});