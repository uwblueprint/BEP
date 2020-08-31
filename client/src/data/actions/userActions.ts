import { FETCH_VOLUNTEER_APPLICATIONS } from "./actionTypes";
import Application from "../types/applicationTypes";

export const fetchUserApplications = (applications: Application[]) => {
  return {
    type: FETCH_VOLUNTEER_APPLICATIONS,
    payload: { applications },
  };
};
