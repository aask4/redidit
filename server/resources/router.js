const router = require('express').Router();
const contentController = require('./contentController');
const controller = require('./controller');
const usersController = require('./usersController');
const subrediditController = require('./subrediditController');

Ordered alphabetically by route
router.route('/content')
  .get(controller.retreiveContent)
  .post(controller.createContent)
  .put(controller.updateContent);

router.route('/login')
  .get(controller.userLogin);

router.route('/signup')
  .post(controller.userSignup);

router.route('/subredidit')
  .get(subrediditController.retrieveSubredidit)
  .post(subrediditController.createSubredidit);

router.route("/userprofile").get(usersController.fetchUserProfile);

router
  .route("/userprofile/subscription")
  .get(usersController.fetchUserSubscription)
  .post(usersController.createUserSubscription);

module.exports.router = router;
