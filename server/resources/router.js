const router = require("express").Router();
const contentController = require("./contentController");
// const controller = require('./controller');
const usersController = require("./usersController");
const subrediditController = require("./subrediditController");
const subscriptionController = require("./subscriptionController");

router
  .route("/content")
  .get(contentController.retreiveContent)
  .post(contentController.createContent)
  .put(contentController.updateContent);

router.route("/content/vote").get(contentController.getVotes);
// .post(contentController.createVotes);

router
  .route("/subredidit")
  .get(subrediditController.retrieveSubredidit)
  .post(subrediditController.createSubredidit);

// router.route('/userprofile').get(usersController.fetchUserProfile);

router
  .route("/subscription")
  .get(subscriptionController.fetchUserSubscription) // TODO: work with Shayne to merge with login
  .post(subscriptionController.createUserSubscription)
  .delete(subscriptionController.deleteUserSubscription);

router.route("/signup").post(usersController.createUser);
router.route("/login").get(usersController.login);
router.route("/authentication").get(usersController.authentication);

module.exports.router = router;
