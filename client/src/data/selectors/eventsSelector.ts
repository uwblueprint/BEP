import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";
import Application from "../types/applicationTypes";

const getActiveEventsData = (state: EventsState) => {
  return state.activeList ? state.activeList : [];
};
const getPastEventsData = (state: EventsState) => {
  return state.pastList ? state.pastList : [];
};
const getNumPastEventsRecievedData = (state: EventsState) => {
  return state.numPastEventsRecieved ? state.numPastEventsRecieved : 0;
};
const getAllApplicationsData = (state: EventsState) => {
  return state.applications
    ? state.applications
    : new Map<string, Application[]>();
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

export const getEventApplications = (eventId: string, state: EventsState) =>
  createSelector([getAllApplicationsData], (applicationsMap) => {
    const applications = applicationsMap.get(eventId);
    return applications ? applications : [];
  })(state);
