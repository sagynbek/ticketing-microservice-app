import { Publisher, Subjects, TicketCreatedEvent } from '@sagyntickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
}