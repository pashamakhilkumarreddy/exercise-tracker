const router = require('express').Router();
const { UserController } = require('../controllers');

router.route('/').get(UserController.getUser);
router.route('/add').post(UserController.addUser);

module.exports = router;
