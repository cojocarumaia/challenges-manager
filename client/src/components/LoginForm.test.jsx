import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import LoginForm from './LoginForm';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('LoginForm', () => {
    test('shows the email and password fields', () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={vi.fn()} />
            </MemoryRouter>
        );

        expect(
            screen.getByLabelText('login.email')
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText('login.password')
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: 'login.submit',
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', {
                name: 'forgotPassword.link',
            })
        ).toBeInTheDocument();
    });

    test('refuses an empty submission', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(
            <MemoryRouter>
                <LoginForm onSubmit={onSubmit} />
            </MemoryRouter>
        );

        await user.click(
            screen.getByRole('button', {
                name: 'login.submit',
            })
        );

        expect(onSubmit).not.toHaveBeenCalled();
    });
});