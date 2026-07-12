import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';

function ChallengeForm({ initialValues, onSubmit, submitLabel }) {
    const [formData, setFormData] = useState(initialValues);
    const { t } = useTranslation();

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const debouncedSubmit = useDebouncedCallback((data) => {
        onSubmit(data);
    }, 500);

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.title.trim()) {
            alert(t('validation.titleRequired'));
            return;
        }

        if (Number(formData.targetSteps) <= 0) {
            alert(t('validation.targetStepsPositive'));
            return;
        }

        debouncedSubmit(formData);
    }

    return (
        <Form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <Form.Group className="mb-3">
                <Form.Label htmlFor="title">
                    {t('form.title')}
                </Form.Label>

                <Form.Control
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">
                    {t('form.description')}
                </Form.Label>

                <Form.Control
                    id="description"
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="targetSteps">
                    {t('form.targetSteps')}
                </Form.Label>

                <Form.Control
                    id="targetSteps"
                    type="number"
                    name="targetSteps"
                    value={formData.targetSteps}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="startDate">
                    {t('form.startDate')}
                </Form.Label>

                <Form.Control
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="endDate">
                    {t('form.endDate')}
                </Form.Label>

                <Form.Control
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit" variant="primary">
                {submitLabel}
            </Button>
        </Form>
    );
}

export default ChallengeForm;