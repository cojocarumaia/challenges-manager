import { useState } from 'react';

const fallbackImage =
    'https://placehold.co/800x400?text=Challenge';

function getThumbnailUrl(imageUrl) {
    if (!imageUrl) {
        return imageUrl;
    }

    if (imageUrl.includes('picsum.photos/seed/')) {
        return imageUrl.replace(
            /\/\d+\/\d+$/,
            '/600/400'
        );
    }

    return imageUrl;
}

function ChallengeImage({ src, alt }) {
    const [loaded, setLoaded] = useState(false);

    const thumbnailUrl = getThumbnailUrl(src);

    return (
        <div
            className="position-relative bg-body-secondary"
            style={{
                width: '100%',
                height: '220px',
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
                src={thumbnailUrl || fallbackImage}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                    setLoaded(true);
                }}
                style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 200ms ease-in',
                }}
            />
        </div>
    );
}

export default ChallengeImage;