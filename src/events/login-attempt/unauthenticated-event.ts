import { Subjects } from "../subjects";

export interface UnauthenticatedEvent {
  readonly subject: Subjects.LoginAttemptUnauthenticated
  data: {
    userId: string,
    userName: string,
    firstName: string,
    lastName: string,
    date: Date
  }
}
