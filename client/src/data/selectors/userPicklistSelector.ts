import { createSelector } from "reselect";
import { UserPicklistState } from "../reducers/userPicklistReducers";
import { UserPicklistType } from "../types/userPicklistTypes";

const getPicklistData = (picklistType: UserPicklistType) => (
  state: UserPicklistState
) =>
  state[UserPicklistType[picklistType]]
    ? state[UserPicklistType[picklistType]]
    : [];
export const getExternalActivitesPicklist = createSelector(
  [getPicklistData(UserPicklistType.volunteerDesiredExternalActivities)],
  (picklist) => picklist
);

export const getInternalActivitesPicklist = createSelector(
  [getPicklistData(UserPicklistType.volunteerDesiredInternalActivities)],
  (picklist) => picklist
);

export const getExpertiesAreasPicklist = createSelector(
  [getPicklistData(UserPicklistType.expertiseAreas)],
  (picklist) => picklist
);

export const getGradesPicklist = createSelector(
  [getPicklistData(UserPicklistType.grades)],
  (picklist) => picklist
);

export const getPostSecondaryTrainingPicklist = createSelector(
  [getPicklistData(UserPicklistType.postSecondaryTraining)],
  (picklist) => picklist
);
