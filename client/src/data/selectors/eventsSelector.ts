import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";
import Application from "../types/applicationTypes";
import Invitation from "../types/invitationTypes";

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

const getAllInvitationsData = (state: EventsState) => {
  return state.invitations
    ? state.invitations
    : new Map<string, Invitation[]>();
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

  export const getEventInvitations = (eventId: string, state: EventsState) =>
  createSelector([getAllInvitationsData], (invitationsMap) => {
    const invitations = invitationsMap.get(eventId);
    return invitations ? invitations : [];
  })(state);
