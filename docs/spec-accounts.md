# Accounts Feature

## Goal

Allow users to create an account, sign in, sign out, and reset their password using Firebase Authentication.

## User can

- Create a new account using email and password.
- Sign in using an existing account.
- Sign out safely.
- Reset their password using their email address.

## Rules

- Email must be valid.
- Password must contain at least 6 characters.
- Authentication is handled by Firebase Authentication.
- Users should see clear error messages if authentication fails.
- After successful login or registration, the user is redirected to the Challenges page.
- Logged out users should not stay authenticated.
- Password reset sends a reset email.

## How we know it works

- A new user can register.
- An existing user can log in.
- Invalid credentials display an error.
- Logout ends the current session.
- Password reset email is sent successfully.