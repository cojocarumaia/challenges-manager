const validateChallenge = (req, res, next) => {
    const { title, targetSteps } = req.body;

    if (
        !title ||
        typeof title !== 'string' ||
        title.trim() === '' ||
        !targetSteps ||
        typeof targetSteps !== 'number' ||
        targetSteps <= 0
    ) {
        return res.status(400).json({
            message: 'Title and targetSteps are required and must be valid.',
        });
    }

    next();
};

module.exports = validateChallenge;