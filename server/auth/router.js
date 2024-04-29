const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signUp, signIn, signOut, editUser , blockUser, unblockUser} = require('./controller');



router.post('/api/signup', signUp);
router.post('/api/signin', passport.authenticate('local', { failureRedirect: '/login?error=1' }), signIn);
router.get('/api/signout', signOut);
router.post('/api/edituser', editUser);

router.put('/api/block', blockUser);
router.put('/api/unblock', unblockUser);

module.exports = router;
