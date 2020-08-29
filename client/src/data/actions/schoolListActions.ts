import { FETCH_SCHOOLLIST } from "./actionTypes";
import { SchoolListType } from "../types/schoolListTypes";
import { SchoolListPayload } from "../reducers/schoolListReducers";

export interface SchoolListActions {
  payload: SchoolListPayload;
}

export const fetchSchoolList = (schoolList: string[]): SchoolListActions => {
  return {
    type: FETCH_SCHOOLLIST,
    payload: { schoolList },
  };
};
