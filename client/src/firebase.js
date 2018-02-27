import config from "../../config";
import firebase from "firebase";

firebase.initializeApp(config);

module.exports = {
  signup: function(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(
          "failed to create user this is the err",
          errorCode,
          errorMessage
        );
      });
  },
  login: function(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }
};
