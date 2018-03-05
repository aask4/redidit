const request = require("supertest");
const app = require("../server/server.js");

describe("Test Subredidit Controller", () => {
  test("It should response the GET method with queried name if exists", done => {
    request(app)
      .get("/subredidit")
      .query({ subrediditName: "Travel" })
      .then(response => {
        expect(response.body[0].name).toBe("Travel");
        done();
      });
  });
});
