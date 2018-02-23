const request = require('supertest');
const app = require('../server/server.js');

describe('Test content routes', () => {
  test('It should save post to the database', (done) => {
    const post = {
      owner: 1,
      parent: 1,
      type: 'post',
      content: 'www.example.com'
    }
    request(app)
      .post('/content', post)
      .then((response) => {
        expect(response.owner).toEqual(1);
        expect(response.type).toEqual('post');
        done();
      });
  });

  test('It should retreive posts from database', (done) => {
    request(app)
      .get('/content', {
        params: {
          owner: 1
        }
      })
      .then((response) => {
        expect(response).toBe(Array);
        done();
      });
  });
});
