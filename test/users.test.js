const request = require("supertest");
const app = require("../server/server.js");
const Users = require("../db/models/usersModel");

describe("Test the userprofile path", () => {
  // beforeAll(() => Promise.all([Users.drop(), Users.sync()]));
  test("it should add user to database", done => {
    request(app)
      .post("/signup")
      .send({
        username: "supertestuser01",
        password: "123456",
        email: "supertestemail@gmail.com"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe("supertestuser01");
        done();
      });
  });

  test("it should log in registered user", done => {
    request(app)
      .get("/login")
      .query({
        email: "supertestemail@gmail.com",
        password: "123456"
      })
      .expect(200)
      .then(response => {
        expect(response.body.username).toBe("supertestuser01");
        done();
      });
  });

  test("should not anthenticate the user if email not found", done => {
    console.log("running 3rd test");
    request(app)
      .get("/authentication")
      .query({ email: "nonexsisted@test.com" })
      .expect(403)
      .then(res => {
        expect(res.body.success).toBeFalsy();
        expect(res.body.message).toBe("email not found");
        done();
      });
  });
  afterAll(() => {
    Users.destroy({ where: { username: "supertestuser01" } });
  });
});
