import { FETCH_EMPLOYERS, CREATE_EMPLOYER } from "./actionTypes";
import Employer from "../types/employerTypes";

export const fetchEmployers = (employers: Employer[]) => ({
  type: FETCH_EMPLOYERS,
  payload: { employers },
});

export const createEmployer = (employer: Employer) => ({
  type: CREATE_EMPLOYER,
  payload: { employer },
});
