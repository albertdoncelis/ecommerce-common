import { Subjects } from "../subjects";

export interface AuthenticatedEvent {
  readonly subject: Subjects.LoginAttemptAuthenticated
  data: {
    userId: string,
    userName: string,
    firstName: string,
    lastName: string,
    date: Date
  }
}
