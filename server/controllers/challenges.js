const Challenge = require('../models/Challenge');

const getChallenges = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(
    Math.max(Number(req.query.limit) || 10, 1),
    50
  );

  const skip = (page - 1) * limit;

  const [challenges, totalChallenges] = await Promise.all([
    Challenge.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Challenge.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalChallenges / limit);

  res.status(200).json({
    challenges,
    currentPage: page,
    totalPages,
    totalChallenges,
    hasMore: page < totalPages,
  });
};

const getChallengeById = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return res.status(404).json({
      message: 'Challenge not found',
    });
  }

  res.status(200).json(challenge);
};

const createChallenge = async (req, res) => {
  const challenge = await Challenge.create(req.body);

  res.status(201).json(challenge);
};

const updateChallenge = async (req, res) => {
  const challenge = await Challenge.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!challenge) {
    return res.status(404).json({
      message: 'Challenge not found',
    });
  }

  res.status(200).json(challenge);
};

const deleteChallenge = async (req, res) => {
  const challenge = await Challenge.findByIdAndDelete(req.params.id);

  if (!challenge) {
    return res.status(404).json({
      message: 'Challenge not found',
    });
  }

  res.status(204).send();
};

module.exports = {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};