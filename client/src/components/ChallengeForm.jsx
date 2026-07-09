import { useState } from 'react';

function ChallengeForm({ initialValues, onSubmit, submitLabel }) {
    const [formData, setFormData] = useState(initialValues);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

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

        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Target Steps</label>
                <input
                    className="form-control"
                    type="number"
                    name="targetSteps"
                    value={formData.targetSteps}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                    className="form-control"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                    className="form-control"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                {submitLabel}
            </button>
        </form>
    );
}

export default ChallengeForm;