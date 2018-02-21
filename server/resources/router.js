const router = require('express').Router();
const controller = require('./controller');

// Ordered alphabetically by route
router.route('/comment')
  .get(controller.retreiveComments)
  .post(controller.createComment)
  .put(controller.updateScore);

router.route('/login')
  .get(controller.userLogin);

router.route('/post')
  .get(controller.retreivePosts)
  .post(controller.createPost)
  .put(controller.updateScore);

router.route('/signup')
  .post(controller.userSignup);

router.route('/subredidit')
  .get(controller.retreiveSubredidit)
  .post(controller.createSubredidit);

router.route('/userprofile')
  .get(controller.retreiveUserProfile);

router.route('/userprofile/subscription')
  .get(controller.retreiveUserSubscriptions)
  .post(controller.appendUserSubscription);

module.exports.router = router;
