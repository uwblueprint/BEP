import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionTypes";

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

export const loginFailed = () => {
  return {
    type: LOGIN_FAILURE
  }
}
