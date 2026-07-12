import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ChallengeForm from './ChallengeForm';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('ChallengeForm', () => {
    it('renders all form inputs', () => {
        render(
            <ChallengeForm
                initialValues={{
                    title: '',
                    description: '',
                    targetSteps: '',
                    startDate: '',
                    endDate: '',
                }}
                onSubmit={vi.fn()}
                submitLabel="Create"
            />,
        );

        expect(screen.getByLabelText('form.title')).toBeInTheDocument();
        expect(screen.getByLabelText('form.description')).toBeInTheDocument();
        expect(screen.getByLabelText('form.targetSteps')).toBeInTheDocument();
        expect(screen.getByLabelText('form.startDate')).toBeInTheDocument();
        expect(screen.getByLabelText('form.endDate')).toBeInTheDocument();
    });
    it('does not call onSubmit when the form is invalid', async () => {
        const onSubmit = vi.fn();

        render(
            <ChallengeForm
                initialValues={{
                    title: '',
                    description: '',
                    targetSteps: '',
                    startDate: '',
                    endDate: '',
                }}
                onSubmit={onSubmit}
                submitLabel="Create"
            />,
        );

        window.alert = vi.fn();

        const submitButton = screen.getByRole('button', {
            name: 'Create',
        });

        submitButton.click();

        expect(onSubmit).not.toHaveBeenCalled();
    });
});