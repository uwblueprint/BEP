import { createSelector } from "reselect";
import { User } from "../types/userTypes";

const getUser = (email: string) => (
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
