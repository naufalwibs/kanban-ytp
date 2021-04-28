const express = require('express');
const router = express.Router();
const accountRoute = require('./accountRoute');
const kanbanRoute = require('./kanbanRoute');
const { authenticate } = require('../middlewares/auth')

router.use(accountRoute);

router.use(authenticate)

router.use(kanbanRoute);

module.exports = router;