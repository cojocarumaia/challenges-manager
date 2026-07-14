const express = require('express');
const {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require('../controllers/challenges');

const validateChallenge = require('../middleware/validateChallenge');

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.post('/', validateChallenge, createChallenge);
router.put('/:id', validateChallenge, updateChallenge);
router.delete('/:id', deleteChallenge);

module.exports = router;