import {
  FETCH_ACTIVE_EVENTS,
  FETCH_PAST_EVENTS,
  UPDATE_EVENT,
} from "./actionTypes";
import { Event } from "../types/EventTypes";

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
