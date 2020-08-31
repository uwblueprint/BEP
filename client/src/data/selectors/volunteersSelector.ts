import { createSelector } from "reselect";
import { VolunteersState } from "../reducers/volunteersReducers";
import { Volunteer } from "../types/userTypes";

const getVolunteersData = (state: VolunteersState) => {
  return state.list ? state.list : [];
};

export const getVolunteers = createSelector(
  [getVolunteersData],
  (volunteers) => volunteers
);

const getVolunteerApplicationsData = (state: any) => {
  return state.volunteers && state.volunteers.applications ? state.volunteers.applications : [];
}

export const getVolunteerApplications = createSelector(
  [getVolunteerApplicationsData],
  (applications) => applications
)
