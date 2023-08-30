import request from 'supertest';
import { app } from '../../index';
import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

describe('GET /users', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
  });

  it('should return an array of users', async () => {
    const response = await request(app).get('/users');
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(app).post('/users').send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });
});

describe('GET /users/guest', () => {
  it('should return a guest user object', async () => {
    const response = await request(app).get('/users/guest');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toMatch(/^guest/);
  });
});

describe('GET /users/guest/:id', () => {
  it('should return a guest user with id in name', async () => {
    const id = '12';
    const response = await request(app).get(`/users/guest/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toMatch(new RegExp(`^.*${id}$`));
  });

  it('should return 404 if user not found', async () => {
    const response = await request(app).get('/users/guest/nonexistent');
    expect(response.statusCode).toBe(404);
  });
});
