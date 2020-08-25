import { createSelector } from "reselect";
import { PicklistState } from "../reducers/picklistReducers";
import { PicklistType } from "../types/picklistTypes";

const getPicklistData = (picklistType: PicklistType) => (
  state: PicklistState
) =>
  state[PicklistType[picklistType]]
    ? state[PicklistType[picklistType]]
    : [];

const createPicklistSelector = (picklistType: PicklistType) => createSelector(
  [getPicklistData(picklistType)],
  (picklist) => picklist
);
export const getExternalActivitesPicklist = createPicklistSelector(PicklistType.volunteerDesiredExternalActivities)

export const getInternalActivitesPicklist = createPicklistSelector(PicklistType.volunteerDesiredInternalActivities)

export const getExpertiesAreasPicklist = createPicklistSelector(PicklistType.expertiseAreas)

export const getGradesPicklist = createPicklistSelector(PicklistType.grades)

export const getPostSecondaryTrainingPicklist = createPicklistSelector(PicklistType.postSecondaryTraining)

export const getLocationsPicklist = createPicklistSelector(PicklistType.locations)

export const getLanguagesPicklist = createPicklistSelector(PicklistType.languages)
