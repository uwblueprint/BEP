import {
  FETCH_ACTIVE_EVENTS,
  FETCH_PAST_EVENTS,
  UPDATE_EVENT,
} from "../actions/actionTypes";
import { Event } from "../types/EventTypes";
import { UserType } from "../types/userTypes";

export interface EventsState {
  activeList: Event[];
  // Number of past events recieved from the backend. Since past events are filtered before
  // being assigned to `state.events.pastList`, the length of the `pastList` array will not
  // match `numPastEventsRecieved`.
  numPastEventsRecieved: number;
  pastList: Event[];
}

const initialState: EventsState = {
  activeList: [],
  numPastEventsRecieved: 0,
  pastList: [],
};

export default function eventsFilter(
  state: EventsState = initialState,
  action: { type: string; payload: any; filter: any }
) {
  const visibilityFilter =
    action.payload &&
    action.payload.userType &&
    action.payload.userId &&
    action.payload.userType === UserType.Educator
      ? (event: Event) => event.contact.id === action.payload.userId
      : (event: Event) => event.isPublic;

  switch (action.type) {
    case FETCH_ACTIVE_EVENTS:
      return {
        ...state,
        activeList: action.payload.list.filter(visibilityFilter),
      };
    case FETCH_PAST_EVENTS:
      return {
        ...state,
        pastList: state.pastList.concat(
          action.payload.list.filter(visibilityFilter)
        ),
        numPastEventsRecieved:
          state.numPastEventsRecieved + action.payload.list.length,
      };
    case UPDATE_EVENT:
      let foundEvent = false;
      return {
        ...state,
        activeList: state.activeList.map((event) => {
          if (event.id === action.payload.event.id) {
            foundEvent = true;
            return action.payload.event;
          }
          return event;
        }),
        pastList: foundEvent
          ? state.pastList
          : state.pastList.map((event) =>
              event.id === action.payload.event.id
                ? action.payload.event
                : event
            ),
      };
    default:
      return state;
  }
}
