import { Event } from "./eventTypes";
import { Volunteer } from "./userTypes";

export default interface EventVolunteer {
  event: Event;
  id: string;
  volunteer: Volunteer;
  status: string;
}

export enum EventVolunteerStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
}
