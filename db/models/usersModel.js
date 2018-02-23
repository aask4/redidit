const { db, Sequelize } = require("../index");

const Users = db.define("users", {
  email: Sequelize.STRING,
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING
});

Users.sync()
  .then(() => console.log("Users table created"))
  .catch(err => console.error(err));

module.exports = Users;
