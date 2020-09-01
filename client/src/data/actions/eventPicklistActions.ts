import { FETCH_EVENT_PICKLIST } from "./actionTypes";
import { EventPicklistType } from "../types/EventPicklistTypes";
import { EventPicklistsPayload } from "../reducers/eventPicklistReducers"

export interface EventPicklistsAction {
    type: string;
    payload: EventPicklistsPayload;
}

export const fetchPicklist = (
    picklistType: EventPicklistType,
    picklist: string[]
  ): EventPicklistsAction => {
    return {
      type: FETCH_EVENT_PICKLIST,
      payload: { picklistType, picklist },
    };
  };

