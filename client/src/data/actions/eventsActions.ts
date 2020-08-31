import {
  FETCH_ACTIVE_EVENTS,
  FETCH_EVENT_APPLICATIONS,
  FETCH_PAST_EVENTS,
  FETCH_VOLUNTEERS_OF_EVENT,
  UPDATE_EVENT,
} from "./actionTypes";
import { Event } from "../types/eventTypes";
import Application from "../types/applicationTypes";
import { Volunteer } from "../types/userTypes";

export const fetchActiveEvents = (
  events: Event[],
  userType: number,
  userId: string
) => ({
  type: FETCH_ACTIVE_EVENTS,
  payload: { list: events, userType, userId },
});

export const fetchPastEvents = (
  events: Event[],
  userType: number,
  userId: string
) => ({
  type: FETCH_PAST_EVENTS,
  payload: { list: events, userType, userId },
});

export const updateEvent = (event: Event) => ({
  type: UPDATE_EVENT,
  payload: { event },
});

export const fetchEventApplications = (
  event: Event,
  applications: Application[]
) => ({
  type: FETCH_EVENT_APPLICATIONS,
  payload: { applications, event },
});

export const fetchVolunteersOfEvent = (
  event: Event,
  volunteers: Volunteer[]
) => ({
  type: FETCH_VOLUNTEERS_OF_EVENT,
  payload: { event, volunteers },
});
