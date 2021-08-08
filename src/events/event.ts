import { Subjects } from "./subjects";

export interface Event {
  readonly subject: Subjects
  readonly data: any
}