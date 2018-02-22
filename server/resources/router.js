const router = require('express').Router();
const controller = require('./contentController');

// Ordered alphabetically by route
router.route('/content')
  .get(controller.retreiveContent)
  .post(controller.createContent)
//   .put(controller.updateContent);

// router.route('/login')
//   .get(controller.userLogin);

// router.route('/signup')
//   .post(controller.userSignup);

// router.route('/subredidit')
//   .get(controller.retreiveSubredidit)
//   .post(controller.createSubredidit);

// router.route('/userprofile')
//   .get(controller.retreiveUserProfile);

// router.route('/userprofile/subscription')
//   .get(controller.retreiveUserSubscriptions)
//   .post(controller.appendUserSubscription);

module.exports.router = router;
