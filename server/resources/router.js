const router = require('express').Router();
const contentController = require('./contentController');
// const controller = require('./controller');
const usersController = require('./usersController');
const subrediditController = require('./subrediditController');

router
  .route('/content')
  .get(contentController.retreiveContent)
  .post(contentController.createContent)
  .put(contentController.updateContent);

router.route('/content/vote').get(contentController.getVotes);
// .post(contentController.createVotes);

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
