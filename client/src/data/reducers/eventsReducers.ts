import { FETCH_EVENTS, CHANGE_EVENTS_FILTER } from "../actions/actionTypes";
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
          // action.payload.list.filter((t: Event) => new Date(t.endDate) >= today)
          action.payload.list.filter((t: Event) => { console.log(new Date(t.endDate)); return new Date(t.endDate) >= today})
        ),
        pastList: state.pastList.concat(
          action.payload.list.filter((t: Event) => new Date(t.endDate) < today)
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
