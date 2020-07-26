import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const generateValidId = () => {
  return new mongoose.Types.ObjectId().toHexString();
}

it('returns a 404 if the provided id does not exist', async () => {
  await request(app)
    .put(`/api/tickets/${generateValidId()}`)
    .set('Cookie', global.signin())
    .send({
      title: "Title",
      price: 16.99,
    })
    .expect(404);
});

it('returns a 401 if the user is not authorized', async () => {
  await request(app)
    .put(`/api/tickets/${generateValidId()}`)
    .send({
      title: "Title",
      price: 16.99,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdasdasda dasd asd',
      price: 125,
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: "Title",
      price: 16.99,
    })
    .expect(401);
});

it('returns a 400 if the user provided invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasdasda dasd asd',
      price: 125,
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 1265,
    }).expect(400);


  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Title',
    }).expect(400)
});

it('updates the ticked provided valid data', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasdasda dasd asd',
      price: 125,
    })


  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Updated',
      price: 77,
    }).expect(200);


  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

  expect(ticketResponse.body.title).toEqual('Updated');
  expect(ticketResponse.body.price).toEqual(77);
});
