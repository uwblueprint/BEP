import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";

const getActiveEventsData = (state: EventsState) => {
  return state.activeList ? state.activeList : [];
};
const getPastEventsData = (state: EventsState) => {
  return state.pastList ? state.pastList : [];
};
const getNumPastEventsRecievedData = (state: EventsState) => {
  return state.numPastEventsRecieved ? state.numPastEventsRecieved : 0;
};

export const getActiveEvents = createSelector(
  [getActiveEventsData],
  (activeEvents) => activeEvents
);

export const getPastEvents = createSelector(
  [getPastEventsData],
  (pastEvents) => pastEvents
);

export const getNumPastEventsRecieved = createSelector(
  [getNumPastEventsRecievedData],
  (numPastEventsRecieved) => numPastEventsRecieved
);
