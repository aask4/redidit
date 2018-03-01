const router = require('express').Router();
const contentController = require('./contentController');
const usersController = require('./usersController');
const subrediditController = require('./subrediditController');
const subscriptionController = require('./subscriptionController');

router
  .route('/content')
  .get(contentController.retreiveContent)
  .post(contentController.createContent)
  .put(contentController.updateContent);

router.route('/content/vote').get(contentController.getVotes);

router
  .route('/subredidit')
  .get(subrediditController.retrieveSubredidit)
  .post(subrediditController.createSubredidit);

router
  .route('/subscription')
  .get(subscriptionController.fetchUserSubscription)
  .post(subscriptionController.createUserSubscription)
  .delete(subscriptionController.deleteUserSubscription);

router.route('/signup').post(usersController.createUser);
router.route('/login').get(usersController.login);
router.route('/authentication').get(usersController.authentication);
router.route('/userprofile/:user').get((req, res) => res.redirect('/'));

module.exports.router = router;
