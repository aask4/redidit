const path = require('path');

/********************************************/
// User Controllers for login, signup, user profile
//   subrscription get and post
exports.userLogin = (req, res) => {
  // req.body requires username and password

}

exports.userSignup = (req, res) => {
  // req.body requires username, password, and email

}

exports.retreiveUserProfile = (req, res) => {
  // req.body requires username or _id

}

exports.retreiveUserSubscriptions = (req, res) => {
  // req.body requires username or _id

}

exports.appendUserSubscription = (req, res) => {
  // req.body requires username or _id and subredidit _id

}

/********************************************/
// Score controller or updateing posts and comments
exports.updateContent = (req, res) => {
  // req.body requires target's _id and new score

} 

/********************************************/
// Subredidit controllers
exports.retreiveSubredidit = (req, res) => {
  // req.body requires subredidit _id
}

exports.createSubredidit = (req, res) => {
  // req.body requires title

}
