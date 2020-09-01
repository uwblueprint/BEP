import {
  getActiveEvents,
  getPastEvents,
  getEvents,
  updateEvent,
} from "../../utils/eventsApiUtils";
import {
  fetchEvents,
  fetchActiveEvents,
  fetchPastEvents,
  updateEvent as updateEventAction,
} from "../actions/eventsActions";
import { Event } from "../types/eventTypes";

export function fetchEventsService(
  limit: number,
  offset: number,
  userType: number,
  userId: string
) {
  return (dispatch: any) => {
    return getEvents(limit, offset).then((res: any) => {
      dispatch(fetchEvents(res.data, userType, userId));
      return res;
    });
  };
}

export function fetchActiveEventsService(userType: number, userId: string) {
  return (dispatch: any) => {
    return getActiveEvents().then((res: any) => {
      dispatch(fetchActiveEvents(res.data, userType, userId));
      return res;
    });
  };
}

export function fetchPastEventsService(
  limit: number,
  offset: number,
  userType: number,
  userId: string
) {
  return (dispatch: any) => {
    return getPastEvents(limit, offset).then((res: any) => {
      dispatch(fetchPastEvents(res.data, userType, userId));
      return res;
    });
  };
}

export function updateEventService(event: Event) {
  return (dispatch: any) => {
    return updateEvent(event).then((res: any) => {
      dispatch(updateEventAction(res.data));
      return res;
    });
  };
}
