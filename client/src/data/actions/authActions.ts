import { LOGIN_REQUEST } from "./actionTypes";

export interface loginRequestAction {
  type: string;
  payload: any;
}

export const loginRequest = (
    data: any
): loginRequestAction => {
  return {
    type: LOGIN_REQUEST,
    payload: { data },
  };
};
