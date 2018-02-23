const request = require('supertest');
const app = require('../server/server.js');
const Users = require('../db/models/usersModel');
const Subredidit = require('../db/models/subrediditModel');
const UsersSubredidits = require('../db/models/usersSubrediditModel');

describe('Test the userprofile path', () => {
  beforeAll(() =>
    Promise.all([Users.drop(), UsersSubredidits.drop(), Users.sync(), UsersSubredidits.sync()]));

  test('It should respond with a user', (done) => {
    Users.create({
      email: 'test@gmail.com',
      username: 'jestTest',
      password: '1234',
    }).then(() =>
      request(app)
        .get('/userprofile')
        .query({ username: 'jestTest' })
        .then((response) => {
          expect(response.body[0].username).toBe('jestTest');
          done();
        }));
  });

  test('It should subscribe a user to a subredidit', (done) => {
    request(app)
      .post('/userprofile/subscription')
      .send({ users_id: 1, subredidits_id: 1 })
      .then((response) => {
        expect(response.body.users_id).toBe(1);
        done();
      });
  });

  test('It should fetch a user subredidit subscription', (done) => {
    request(app)
      .get('/userprofile/subscription')
      .query({ users_id: 1, subredidits_id: 1 })
      .then((response) => {
        expect(response.body[0].users_id).toBe(1);
        done();
      });
  });

  afterAll(() => {
    Users.destroy({ where: { username: 'jestTest' } });
    UsersSubredidits.destroy({ where: { users_id: 1 } });
  });
});
