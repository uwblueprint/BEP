import { FETCH_USER_PICKLIST } from "./actionTypes";

export interface UserPicklistsAction {
  type: string;
  payload: any;
}

export const postLogin = (
    data: any
): UserPicklistsAction => {
  return {
    type: FETCH_USER_PICKLIST,
    payload: { data },
  };
};
