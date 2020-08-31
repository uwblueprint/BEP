import { FETCH_USER_APPLICATIONS } from "./actionTypes";
import Application from "../types/applicationTypes";

export const loginFailed = (applications: Application[]) => {
  return {
    type: FETCH_USER_APPLICATIONS,
    payload: { applications },
  };
};
