import { LOGIN_SUCCESS } from "./actionTypes";

export interface loginRequestAction {
  type: string;
  payload: any;
}

export const loginRequest = ( data: any ) => {
  console.log(data)
  return {
    type: LOGIN_SUCCESS,
    payload: { data },
  };
};
