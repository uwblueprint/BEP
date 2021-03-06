import { createSelector } from "reselect";
import { EventPicklistState } from "../reducers/eventPicklistReducers";
import { EventPicklistType } from "../types/EventPicklistTypes"


const getPicklistData = (picklistType: EventPicklistType) => (
  state: EventPicklistState
) => {
  return state[EventPicklistType[picklistType]]
    ? state[EventPicklistType[picklistType]]
    : [];
}

const createPicklistSelector = (picklistType: EventPicklistType) => createSelector(
  [getPicklistData(picklistType)],
  (picklist) => picklist
);
export const getActivityTypePicklist = createPicklistSelector(EventPicklistType.activityType)
export const getPreferredSectorPicklist = createPicklistSelector(EventPicklistType.preferredSector)
export const gradeOfStudents = createPicklistSelector(EventPicklistType.gradeOfStudents)