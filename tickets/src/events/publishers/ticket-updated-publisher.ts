import { Publisher, Subjects, TicketUpdatedEvent } from '@sagyntickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
}