/* import request from 'supertest';
import app from '../src/app';

describe('GET /api/destination/random', () => {
  it('should return a random destination', async () => {
    const res = await request(app).get('/api/destination/random');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('clues');
    expect(res.body.options).toHaveLength(4);
  });
}); */