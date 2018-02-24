const router = require('express').Router();
// const contentController = require("./contentController");
const controller = require('./controller');
const usersController = require('./usersController');
const subrediditController = require('./subrediditController');

<<<<<<< HEAD
// router
//   .route("/content")
//   .get(controller.retreiveContent)
//   .post(controller.createContent)
//   .put(controller.updateContent);

// router.route("/login").get(controller.userLogin);

// router.route("/signup").post(controller.userSignup);
=======
router
  .route('/content')
  .get(contentController.retreiveContent)
  .post(contentController.createContent)
  .put(contentController.updateContent);

router
  .route('/content/vote')
  .get(contentController.getVotes)
  .post(contentController.createVotes);
>>>>>>> 0a92de4ccc02938f0a28d743b5db008e2fda0dff

router
  .route('/subredidit')
  .get(subrediditController.retrieveSubredidit)
  .post(subrediditController.createSubredidit);

// router.route('/userprofile').get(usersController.fetchUserProfile);

router
  .route('/userprofile/subscription')
  .get(usersController.fetchUserSubscription)
  .post(usersController.createUserSubscription)
  .delete(usersController.deleteUserSubscription);

router.route('/signup').post(usersController.createUser);
router.route('/login').get(usersController.login);

module.exports.router = router;
