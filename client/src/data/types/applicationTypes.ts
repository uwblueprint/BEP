import { Event } from "./eventTypes";
import { Volunteer } from "./userTypes";

export default interface Application {
  event: Event;
  id: string;
  status: string;
  volunteer: Volunteer;
}

export enum ApplicationStatus {
  ACCEPTED = "accepted",
  WITHDRAWN = "withdrawn",
  DECLINED = "declined",
  PENDING = "pending",
}
