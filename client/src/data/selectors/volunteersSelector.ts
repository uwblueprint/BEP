import { createSelector } from "reselect";
import { VolunteersState } from "../reducers/volunteersReducers";
import { Volunteer } from "../types/userTypes";
import { create } from "lodash";

const getVolunteersData = (state: VolunteersState) => {
  return state.list ? state.list : [];
};

export const getVolunteers = createSelector(
  [getVolunteersData],
  (volunteers) => volunteers
);

const getLastNumVolunteersReceivedData = (state: VolunteersState) => {
  return state.lastNumVolunteersRecieved ? state.lastNumVolunteersRecieved : 0;
};

export const getLastNumVolunteersReceived = createSelector(
  [getLastNumVolunteersReceivedData],
  (lastNumVolunteersRecieved) => lastNumVolunteersRecieved
);

const getVolunteerPageNumberData = (state: VolunteersState) => {
  return state.volunteerPageNumber ? state.volunteerPageNumber : 0;
};

export const getVolunteerPageNumber = createSelector(
  [getVolunteerPageNumberData],
  (volunteerPageNumber) => volunteerPageNumber
);

const getVolunteerApplicationsData = (state: any) => {
  return state.volunteers && state.volunteers.applications ? state.volunteers.applications : [];
}

export const getVolunteerApplications = createSelector(
  [getVolunteerApplicationsData],
  (applications) => applications
)

const getVolunteerInvitationsData = (state: any) => {
  return state.volunteers && state.volunteers.invitations ? state.volunteers.invitations : [];
}

export const getVolunteerInvitations = createSelector(
  [getVolunteerInvitationsData],
  (invitations) => invitations
)

const getVolunteerEventsData = (state: any) => {
  return state.volunteers && state.volunteers.events ? state.volunteers.events : [];
}

export const getVolunteerEvents = createSelector(
  [getVolunteerEventsData],
  (events) => events
)
