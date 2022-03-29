const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexpPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware,pageController.getLoginPage);
//page route kendine ait 

module.exports = router;
