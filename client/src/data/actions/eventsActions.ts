import {
  FETCH_EVENTS,
  FETCH_ACTIVE_EVENTS,
  FETCH_PAST_EVENTS,
  UPDATE_EVENT,
  CHANGE_EVENTS_FILTER,
} from "./actionTypes";
import { Event } from "../types/eventTypes";

// export const fetchEvents = (events: any[]) => ({
//     type: FETCH_EVENTS,
//     payload: { list: events }
// })

export const fetchEvents = (
  events: Event[],
  userType: number,
  userId: string
) => ({
  type: FETCH_EVENTS,
  payload: { list: events, userType, userId },
});

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

export const changeFilter = (filter: any) => ({
  type: CHANGE_EVENTS_FILTER,
  filter,
});

export const eventsFilter = {
  ACTIVE_EVENT: "ACTIVE_EVENT",
  PAST_EVENT: "PAST_EVENT",
};
