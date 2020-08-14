import express, { Request, Response } from 'express';
import { validateRequest, requireAuth, NotFoundError, BadRequestError, OrderStatus } from '@sagyntickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders', requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .withMessage('TicketId must be provided')
  ]
  , validateRequest, async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) { throw new NotFoundError(); }

    // Make sure that this ticket is not already reserved
    // Run query to look at all orders. Find an order where the ticket.....

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser?.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket
    })
    await order.save();

    res.send({});
  });

export { router as createOrderRouter }