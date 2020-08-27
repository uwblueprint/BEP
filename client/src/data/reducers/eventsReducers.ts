import {
  FETCH_EVENTS,
  FETCH_ACTIVE_EVENTS,
  FETCH_PAST_EVENTS,
  UPDATE_EVENT,
  CHANGE_EVENTS_FILTER,
} from "../actions/actionTypes";
import { Event } from "../types/EventTypes";

export interface EventsState {
  list: Event[];
  eventsFilter: string;
  activeList: Event[];
  pastList: Event[];
}

const initialState: EventsState = {
  list: [],
  eventsFilter: "ACTIVE",
  activeList: [],
  pastList: [],
};

export default function eventsFilter(
  state: EventsState = initialState,
  action: { type: string; payload: any; filter: any }
) {
  let today: Date = new Date();
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        activeList: state.activeList.concat(
          action.payload.list.filter((t: Event) => new Date(t.endDate) >= today)
        ),
        pastList: state.pastList.concat(
          action.payload.list.filter((t: Event) => new Date(t.endDate) < today)
        ),
      };
    case FETCH_ACTIVE_EVENTS:
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        activeList: state.activeList.concat(action.payload.list),
      };
    case FETCH_PAST_EVENTS:
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        pastList: state.pastList.concat(action.payload.list),
      };
    case UPDATE_EVENT:
      let foundEvent = false;
      return {
        ...state,
        list: state.list.map((event) =>
          event.id === action.payload.event.id ? action.payload.event : event
        ),
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
    case CHANGE_EVENTS_FILTER:
      return {
        ...state,
        eventsFilter: action.filter,
      };
    default:
      return state;
  }
}
