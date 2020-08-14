export enum OrderStatus {
  // When the order has ben created, but 
  // the ticket has not been reserved
  Created = "created",

  // The ticket order is trying to reserve has already been reserved,
  // or when user has cancelled order. 
  // The order expires before payment
  Cancelled = "cancelled",

  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",
  Complete = "complete",
}