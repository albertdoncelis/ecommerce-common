import { Subjects } from "./subjects";
import { Message, Stan } from "node-nats-streaming";
import { Event } from "./event";

export abstract class Listener<T extends Event> {
  readonly abstract subject: T['subject']
  abstract queueGroupName: string
  protected actWait: number = 5000

  constructor(protected readonly client: Stan) {}

  abstract onMessage(data: T['data'], msg: Message): void

  private subscriptionOption() {
    return this.client.subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.actWait)
      .setDurableName(this.queueGroupName)
  }

  private parseMessage(msg: Message) {
    const data = msg.getData()
    return typeof data === 'string' ? JSON.parse(data): JSON.parse(data.toString('utf8'));
  }

  public listen() {
    const subscription = this.client.subscribe(
      this.subject, this.queueGroupName, this.subscriptionOption()
    )

    subscription.on('message', (msg: Message) => {
      console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`)

      const parseData = this.parseMessage(msg)
      this.onMessage(parseData, msg)
    })
  }

}