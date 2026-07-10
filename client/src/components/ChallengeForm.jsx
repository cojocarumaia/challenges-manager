import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDebouncedCallback } from 'use-debounce';

function ChallengeForm({ initialValues, onSubmit, submitLabel }) {
    const [formData, setFormData] = useState(initialValues);

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
            alert('Title is required.');
            return;
        }

        if (Number(formData.targetSteps) <= 0) {
            alert('Target steps must be greater than zero.');
            return;
        }

        debouncedSubmit(formData);
    }

    return (
        <Form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Target Steps</Form.Label>
                <Form.Control
                    type="number"
                    name="targetSteps"
                    value={formData.targetSteps}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
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