import { Message } from 'node-nats-streaming';
import { Subjects, Listener, SmsCreatedEvent } from '@dstransaction/common';

export class SmsCreatedListener extends Listener<SmsCreatedEvent> {
  subject: Subjects.SmsCreated = Subjects.SmsCreated;
  queueGroupName = 'sms-service';

  async onMessage(data: SmsCreatedEvent['data'], msg: Message) {
    console.log('hello world');
    console.log(data);

    msg.ack();
  }
}
