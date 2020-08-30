import { FETCH_EVENT_PICKLIST } from "../actions/actionTypes";
import { EventPicklistType } from "../types/EventPicklistTypes";
import { EventPicklistsAction } from "../actions/eventPicklistActions"

export interface EventPicklistsPayload {
    picklistType: EventPicklistType;
    picklist: string[];
}

export type EventPicklistState = {
    [key in EventPicklistType]: string[];
  };
  
  const initialState: EventPicklistState = {
    [EventPicklistType.activityType]: [],
    [EventPicklistType.preferredSector]: [],
    [EventPicklistType.gradeOfStudents]: [],
  };
  
  export default function (
    state: EventPicklistState = initialState,
    action: EventPicklistsAction
  ) {
    switch (action.type) {
      case FETCH_EVENT_PICKLIST:
          console.log("Action payload", action.payload)
        return {
          ...state,
          [EventPicklistType[action.payload.picklistType]]:
            action.payload.picklist,
        };
  
      default:
        return state;
    }
  }
  
