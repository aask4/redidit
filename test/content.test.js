const request = require("supertest");
const app = require("../server/server.js");

describe("Test content routes", () => {
  test("It should save post to the database", done => {
    const post = {
      owner: 1,
      parent: 1,
      type: "post",
      content: "www.example.com"
    };
    request(app)
      .post("/content")
      .send(post)
      .then(response => {
        console.log("RESPONSE ___________", response.statusCode);
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test("It should retreive posts from database", done => {
    request(app)
      .get("/content")
      .query({
        owner: 1
      })
      .then(response => {
        console.log("RESPONSE __________", response.statusCode);
        expect(200);
        done();
      });
  });
});
