import { createSelector } from "reselect";
import { UserPicklistState } from "../reducers/userPicklistReducers";
import { UserPicklistType } from "../types/userPicklistTypes";

const getPicklistData = (picklistType: UserPicklistType) => (
  state: UserPicklistState
) =>
  state[UserPicklistType[picklistType]]
    ? state[UserPicklistType[picklistType]]
    : [];

const createPicklistSelector = (picklistType: UserPicklistType) => createSelector(
  [getPicklistData(picklistType)],
  (picklist) => picklist
);
export const getExternalActivitesPicklist = createPicklistSelector(UserPicklistType.volunteerDesiredExternalActivities)

export const getInternalActivitesPicklist = createPicklistSelector(UserPicklistType.volunteerDesiredInternalActivities)

export const getExpertiesAreasPicklist = createPicklistSelector(UserPicklistType.expertiseAreas)

export const getGradesPicklist = createPicklistSelector(UserPicklistType.grades)

export const getPostSecondaryTrainingPicklist = createPicklistSelector(UserPicklistType.postSecondaryTraining)

export const getLocationsPicklist = createPicklistSelector(UserPicklistType.locations)

export const getLanguagesPicklist = createPicklistSelector(UserPicklistType.languages)
