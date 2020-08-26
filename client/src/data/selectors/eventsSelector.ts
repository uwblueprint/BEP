import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";

export const getEventsStatus = (state: EventsState) => state.eventsFilter;
export const getEventsData = (state: EventsState) => {
  return state.list ? state.list : [];
};
export const getActiveEventsData = (state: EventsState) => {
  return state.activeList ? state.activeList : [];
};
export const getPastEventsData = (state: EventsState) => {
  return state.pastList ? state.pastList : [];
};

export const getFilteredEvents = createSelector(
  [getEventsStatus, getActiveEventsData, getPastEventsData, getEventsData],
  (eventsFilter, activeEvents, pastEvents, allEvents) => {
    switch (eventsFilter) {
      case "ACTIVE":
        return activeEvents;
      case "PAST":
        return pastEvents;
    }
    return allEvents;
  }
);
