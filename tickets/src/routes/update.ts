import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from '@sagyntickets/common';
import { body } from 'express-validator'
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const userId = req.currentUser!.id;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  if (ticket.userId !== userId) {
    throw new NotAuthorizedError();
  }

  ticket.set({ title, price });
  await ticket.save();

  res.status(200).send(ticket);
});


export { router as updateTicketRouter };
