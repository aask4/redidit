const request = require("supertest");
const app = require("../server/server.js");
const Subredidit = require("../db/models/subrediditModel");
const Users = require("../db/models/usersModel");

describe("Test the subredidit path", () => {
  test("It should respond with newly created Subredidit", done => {
    Subredidit.create({
      name: "JestTest",
      visits: 0
    }).then(() =>
      request(app)
        .get("/subredidit")
        .query({})
        .then(response => {
          expect(response.body[response.body.length - 1].name).toBe("JestTest");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        })
    );
  });
});
