import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import ProtectedRoute from './ProtectedRoute';

const mockOnAuthStateChanged = vi.fn();

vi.mock('firebase/auth', () => ({
    onAuthStateChanged: (...args) =>
        mockOnAuthStateChanged(...args),
}));

vi.mock('../firebase', () => ({
    auth: {},
}));

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('redirects a logged out user to the login page', () => {
        mockOnAuthStateChanged.mockImplementation(
            (auth, callback) => {
                callback(null);
                return vi.fn();
            }
        );

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <h1>Protected page</h1>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={<h1>Login page</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(
            screen.getByText('Login page')
        ).toBeInTheDocument();
    });
});