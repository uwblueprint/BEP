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
  let newState;
  let today: Date = new Date();

  const visibilityFilter = (state: EventsState): EventsState => {
    // If the user is not an educator, only show public events
    if (action.payload.userType !== 1) { 
      const filterFunction = (event: Event) => event.isPublic;
      state.list = state.list.filter(filterFunction);
      state.activeList = state.activeList.filter(filterFunction);
      state.pastList = state.pastList.filter(filterFunction);
    }
    return state;
  };
  
  switch (action.type) {
    case FETCH_EVENTS:
      newState = {
        ...state,
        list: state.list.concat(action.payload.list),
        activeList: state.activeList.concat(
          action.payload.list.filter((t: Event) => new Date(t.endDate) >= today)
        ),
        pastList: state.pastList.concat(
          action.payload.list.filter((t: Event) => new Date(t.endDate) < today)
        ),
      };
      return visibilityFilter(newState);
    case FETCH_ACTIVE_EVENTS:
      newState = {
        ...state,
        list: state.list.concat(action.payload.list),
        activeList: state.activeList.concat(action.payload.list),
      };
      return visibilityFilter(newState);
    case FETCH_PAST_EVENTS:
      newState = {
        ...state,
        list: state.list.concat(action.payload.list),
        pastList: state.pastList.concat(action.payload.list),
      };
      return visibilityFilter(newState);
    case UPDATE_EVENT:
      let foundEvent = false;
      newState = {
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
      return visibilityFilter(newState);
    case CHANGE_EVENTS_FILTER:
      return {
        ...state,
        eventsFilter: action.filter,
      };
    default:
      return state;
  }
}
