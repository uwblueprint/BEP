import { FETCH_USER_PICKLIST } from "./actionTypes";
import { UserPicklistType } from "../services/types/userPicklistTypes";
import { UserPicklistsPayload } from "../reducers/userPicklistReducers";

export interface UserPicklistsAction {
  type: string;
  payload: UserPicklistsPayload;
}

export const fetchPicklist = (
  picklistType: UserPicklistType,
  picklist: string[]
): UserPicklistsAction => {
  return {
    type: FETCH_USER_PICKLIST,
    payload: { picklistType, picklist },
  };
};
