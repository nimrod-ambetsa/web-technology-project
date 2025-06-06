const express = require('express');

const router = express.Router();
const hirerController = require('../controllers/hirer_controller');
const authenticateToken = require('../middleware/auth');

router.post('/register', hirerController.register_hirer);
router.post('/login', hirerController.login_hirer);

module.exports = router;