const { register, login, setAvatar } = require('../controllers/userController');

const router = require('express').Router();
router.post('/register',register);
router.post('/login',login);
router.post('/setAvatarRoute/:id',setAvatar);

module.exports = router;