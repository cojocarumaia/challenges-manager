const express = require('express');

const {
    createUser,
    getUserByFirebaseUid,
} = require('../controllers/users');
const router = express.Router();

router.post('/', createUser);
router.get('/:firebaseUid', getUserByFirebaseUid);
module.exports = router;