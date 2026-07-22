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
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);

router.post(
  '/',
  authenticate,
  requireAdmin,
  validateChallenge,
  createChallenge
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validateChallenge,
  updateChallenge
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  deleteChallenge
);

module.exports = router;