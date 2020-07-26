import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';
import mongoose from 'mongoose';


const createTicket = () => {
  const data = {
    title: 'Title',
    price: 15.99
  }
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(data)
    .expect(201);
}

it('can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toBe(3);
});
