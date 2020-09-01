import { Event } from "./eventTypes";
import { Volunteer } from "./userTypes";

export default interface Invitation {
  event: Event;
  id: string;
  status: string;
  volunteer: Volunteer;
}

export enum InvitationStatus {
  ACCEPTED = "accepted",
  WITHDRAWN = "withdrawn",
  DECLINED = "declined",
  PENDING = "pending",
}
