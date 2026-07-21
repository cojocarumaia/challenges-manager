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

import RegisterPage from './RegisterPage';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

vi.stubGlobal('fetch', vi.fn());

describe('RegisterPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('registers the user and navigates to the home page', async () => {
        const user = userEvent.setup();

        createUserWithEmailAndPassword.mockResolvedValue({
            user: {
                uid: 'firebase-user-id',
                email: 'test@example.com',
            },
        });

        fetch.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                firebaseUid: 'firebase-user-id',
                email: 'test@example.com',
                role: 'user',
            }),
        });

        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

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

        expect(fetch).toHaveBeenCalled();

        await waitFor(() => {
            expect(
                mockNavigate
            ).toHaveBeenCalledWith('/');
        });
    });

    test('shows a generic registration error', async () => {
        const user = userEvent.setup();

        createUserWithEmailAndPassword.mockRejectedValue({
            code: 'auth/email-already-in-use',
        });

        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        await user.click(
            screen.getByRole('button', {
                name: 'submit-register',
            })
        );

        expect(
            await screen.findByText(
                'auth.registrationFailed'
            )
        ).toBeInTheDocument();

        expect(fetch).not.toHaveBeenCalled();

        expect(
            mockNavigate
        ).not.toHaveBeenCalled();
    });
});