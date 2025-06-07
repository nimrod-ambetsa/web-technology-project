const express = require('express');

const router = express.Router();

const hireeController = require('../controllers/hiree_controller');
const authenticateToken = require('../middleware/auth');

router.post('/register', hireeController.register_hiree);
router.post('/login', hireeController.login_hiree);
router.get('/list', hireeController.get_all_hirees);
router.get('/gigs', hireeController.get_gigs);
router.post('/update-profile', hireeController.update_hiree_profile);


module.exports = router