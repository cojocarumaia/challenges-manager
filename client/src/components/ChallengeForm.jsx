import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';

import { storage } from '../firebase';

function ChallengeForm({
    initialValues,
    onSubmit,
    submitLabel,
}) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        ...initialValues,
        image: initialValues.image || '',
    });

    const [isUploading, setIsUploading] =
        useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    }

    async function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            window.alert(
                t('validation.invalidImage')
            );
            event.target.value = '';
            return;
        }

        try {
            setIsUploading(true);

            const safeFileName = file.name.replace(
                /[^a-zA-Z0-9._-]/g,
                '-'
            );

            const imageReference = ref(
                storage,
                `challenge-images/${Date.now()}-${safeFileName}`
            );

            const metadata = {
                contentType: file.type,
                cacheControl:
                    'public,max-age=31536000,immutable',
            };

            const uploadTask =
                uploadBytesResumable(
                    imageReference,
                    file,
                    metadata
                );

            await new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    null,
                    reject,
                    () => resolve()
                );
            });

            const imageUrl = await getDownloadURL(
                uploadTask.snapshot.ref
            );

            setFormData((currentFormData) => ({
                ...currentFormData,
                image: imageUrl,
            }));
        } catch (error) {
            console.error(
                'Failed to upload image:',
                error
            );

            window.alert(
                t('validation.imageUploadFailed')
            );
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    }

    function handleRemoveImage() {
        setFormData((currentFormData) => ({
            ...currentFormData,
            image: '',
        }));
    }

    const debouncedSubmit = useDebouncedCallback(
        (data) => {
            onSubmit(data);
        },
        500
    );

    function handleSubmit(event) {
        event.preventDefault();

        if (isUploading) {
            return;
        }

        if (!formData.title.trim()) {
            window.alert(
                t('validation.titleRequired')
            );
            return;
        }

        if (Number(formData.targetSteps) <= 0) {
            window.alert(
                t('validation.targetStepsPositive')
            );
            return;
        }

        debouncedSubmit({
            ...formData,
            targetSteps: Number(
                formData.targetSteps
            ),
        });
    }

    return (
        <Card className="shadow-sm">
            <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="title"
                    >
                        <Form.Label>
                            {t('form.title')}
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="description"
                    >
                        <Form.Label>
                            {t('form.description')}
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="targetSteps"
                    >
                        <Form.Label>
                            {t('form.targetSteps')}
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="targetSteps"
                            value={
                                formData.targetSteps
                            }
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="startDate"
                    >
                        <Form.Label>
                            {t('form.startDate')}
                        </Form.Label>

                        <Form.Control
                            type="date"
                            name="startDate"
                            value={
                                formData.startDate
                            }
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="endDate"
                    >
                        <Form.Label>
                            {t('form.endDate')}
                        </Form.Label>

                        <Form.Control
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="image"
                    >
                        <Form.Label>
                            {t('form.image')}
                        </Form.Label>

                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={
                                handleImageChange
                            }
                            disabled={isUploading}
                        />

                        {isUploading && (
                            <Form.Text>
                                {t(
                                    'form.uploadingImage'
                                )}
                            </Form.Text>
                        )}
                    </Form.Group>

                    {formData.image && (
                        <div className="mb-3">
                            <Image
                                src={formData.image}
                                alt={t(
                                    'form.imagePreview'
                                )}
                                fluid
                                rounded
                                style={{
                                    width: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'cover',
                                }}
                            />

                            <Button
                                type="button"
                                variant="outline-danger"
                                className="mt-2"
                                onClick={
                                    handleRemoveImage
                                }
                                disabled={isUploading}
                            >
                                {t(
                                    'form.removeImage'
                                )}
                            </Button>
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isUploading}
                    >
                        {isUploading
                            ? t(
                                'form.uploadingImage'
                            )
                            : submitLabel}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ChallengeForm;