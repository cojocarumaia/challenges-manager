const express = require('express');
const {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require('../controllers/challenges');

const validateChallenge = require('../middleware/validateChallenge');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);

router.post(
  '/',
  authenticate,
  validateChallenge,
  createChallenge
);

router.put(
  '/:id',
  authenticate,
  validateChallenge,
  updateChallenge
);

router.delete(
  '/:id',
  authenticate,
  deleteChallenge
);

module.exports = router;