import { FETCH_PICKLIST } from "./actionTypes";
import { PicklistType } from "../types/picklistTypes";
import { PicklistsPayload } from "../reducers/picklistReducers";

export interface PicklistsAction {
  type: string;
  payload: PicklistsPayload;
}

export const fetchPicklist = (
  picklistType: PicklistType,
  picklist: string[]
): PicklistsAction => {
  return {
    type: FETCH_PICKLIST,
    payload: { picklistType, picklist },
  };
};
