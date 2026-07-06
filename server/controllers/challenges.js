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
module.exports = {
  getChallenges,
  getChallengeById,
};
