const express = require('express');
const router = express.Router()
const controllerAccount = require('../controllers/controllerAccount');

router.post('/register', controllerAccount.register);
router.post('/login', controllerAccount.login);
router.post('/loginGoogle', controllerAccount.googleLogin);

module.exports = router;