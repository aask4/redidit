const request = require('supertest');
const app = require('../server/server.js');
const Users = require('../db/models/usersModel');

describe('Test the userprofile path', () => {
  beforeAll(() =>
    Users.create({
      email: 'test@gmail.com',
      username: 'jestTest',
      password: '1234',
    }));

  test('It should respond with a user', (done) => {
    request(app)
      .get('/userprofile')
      .query({ username: 'jestTest' })
      .then((response) => {
        expect(response.body[0].username).toBe('jestTest');
        done();
      });
  });

  afterAll(() => Users.destroy({ where: { username: 'jestTest' } }));
});
