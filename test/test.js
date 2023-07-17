var request = require('supertest');
var app = require('../index.js');
describe('GET /will', function() {
    it('respond with hello world', function(done) {
        request(app).get('/will').expect('{ "response": "Hello World" }', done);
    });
});
describe('GET /', function() {
  it('responds with 200 status code', function(done) {
    request(app).get('/').expect(200, done);
  });

  it('responds with JSON containing a message', function(done) {
    request(app).get('/').expect('Content-Type', /json/).expect({ message: 'Welcome to the API' }, done);
  });
});

describe('POST /user', function() {
  it('responds with 201 status code and success message', function(done) {
    request(app)
      .post('/user')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201)
      .expect({ message: 'User created successfully' }, done);
  });

  it('responds with 400 status code and error message for invalid request', function(done) {
    request(app)
      .post('/user')
      .send({ email: 'john@example.com' })
      .expect(400)
      .expect({ error: 'Name is required' }, done);
  });
});
