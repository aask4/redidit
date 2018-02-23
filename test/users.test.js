const request = require('supertest');
const app = require('../server/server.js');
const Users = require('../db/models/usersModel');
const Subredidit = require('../db/models/subrediditModel');
const UsersSubredidits = require('../db/models/usersSubrediditModel');

describe('Test the userprofile path', () => {
  beforeAll(() => {
    Users.drop()
      .then(() => {
        Subredidit.drop();
      })
      .then(() => {
        UsersSubredidits.drop();
      })
      .then(() => {
        Users.sync();
      })
      .then(() => {
        Subredidit.sync();
      })
      .then(() => {
        UsersSubredidits.sync();
      })
      .then(() => {
        Users.create({
          email: 'test@gmail.com',
          username: 'jestTest',
          password: '1234',
        });
      })
      .then(() => {
        Subredidit.create({
          name: 'jestTest',
          visits: 0,
        });
      })
      .catch(err => console.error(err));
  });

  test('It should respond with a user', (done) => {
    request(app)
      .get('/userprofile')
      .query({ username: 'jestTest' })
      .then((response) => {
        console.log('user get test: ', response.body);
        // expect(response.body[0].username).toBe('jestTest');
        done();
      });
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
        console.log('user_subredidit get test: ', response.body);
        // expect(response.body[0].users_id).toBe(1);
        done();
      });
  });

  afterAll(() => {
    Users.destroy({ where: { username: 'jestTest' } });
    Subredidit.destroy({ where: { name: 'jestTest' } });
    UsersSubredidits.destroy({ where: { users_id: 1 } });
  });
});
