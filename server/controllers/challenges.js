const Challenge = require('../models/Challenge');

const getChallenges = async (req, res) => {
  const challenges = await Challenge.find();

  res.status(200).json(challenges);
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
  const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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