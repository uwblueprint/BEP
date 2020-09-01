import { FETCH_SCHOOLS } from "./actionTypes";
import { School } from "../types/schoolListTypes";
import { SchoolsPayload } from "../reducers/schoolListReducers";

export interface SchoolsAction {
  type: string;
  payload: SchoolsPayload;
}

export const fetchSchoolList = (schoolList: School[]) => {
  return {
    type: FETCH_SCHOOLS,
    payload: { list: schoolList },
  };
};
