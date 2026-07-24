import { useState } from 'react';

const fallbackImage =
    'https://placehold.co/800x400?text=Challenge';

function getImageUrl(imageUrl, size) {
    if (!imageUrl) {
        return imageUrl;
    }

    if (!imageUrl.includes('picsum.photos/seed/')) {
        return imageUrl;
    }

    switch (size) {
        case 'thumbnail':
            return imageUrl.replace(
                /\/\d+\/\d+$/,
                '/600/400'
            );

        case 'medium':
            return imageUrl.replace(
                /\/\d+\/\d+$/,
                '/1200/800'
            );

        case 'full':
        default:
            return imageUrl;
    }
}

function ChallengeImage({
    src,
    alt,
    size = 'thumbnail',
}) {
    const [loaded, setLoaded] = useState(false);

    const imageConfig = {
        thumbnail: {
            url: getImageUrl(src, 'thumbnail'),
            height: '220px',
            objectFit: 'cover',
        },
        medium: {
            url: getImageUrl(src, 'medium'),
            height: '500px',
            objectFit: 'contain',
        },
        full: {
            url: getImageUrl(src, 'full'),
            height: '75vh',
            objectFit: 'contain',
        },
    };

    const currentImage =
        imageConfig[size] || imageConfig.thumbnail;

    return (
        <div
            className="position-relative bg-body-secondary"
            style={{
                width: '100%',
                height: currentImage.height,
                overflow: 'hidden',
            }}
        >
            {!loaded && (
                <div
                    className="placeholder-glow position-absolute top-0 start-0 w-100 h-100"
                    aria-hidden="true"
                >
                    <span className="placeholder w-100 h-100" />
                </div>
            )}

            <img
                src={
                    currentImage.url ||
                    fallbackImage
                }
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={(event) => {
                    event.currentTarget.src =
                        fallbackImage;
                    setLoaded(true);
                }}
                style={{
                    width: '100%',
                    height: currentImage.height,
                    objectFit:
                        currentImage.objectFit,
                    opacity: loaded ? 1 : 0,
                    transition:
                        'opacity 200ms ease-in',
                }}
            />
        </div>
    );
}

export default ChallengeImage;