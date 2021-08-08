import { Event } from "./event";
import { Stan } from "node-nats-streaming";

export abstract class Publisher<T extends Event> {
  readonly abstract subject: T['subject']

  constructor(protected readonly client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err => {
        if (err) {
          return reject(err)
        }
        console.log('Event Published', this.subject)
        resolve()
      }))
    })
  }
}