import { Publisher, Subjects, TransactionCreatedEvent } from '@dstransaction/common';

export class TransactionCreatedPublisher extends Publisher<TransactionCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
