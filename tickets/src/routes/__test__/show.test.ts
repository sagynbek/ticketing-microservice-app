import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const data = {
    title: 'Title',
    price: 15.99
  }
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(data)
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(data.title)
  expect(ticketResponse.body.price).toEqual(data.price)
});
