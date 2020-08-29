import { FETCH_SCHOOLLIST } from "./actionTypes";
import { SchoolListType } from "../types/schoolListTypes";
import { SchoolListPayload } from "../reducers/schoolListReducers";

export interface SchoolListActions {
  type: string;
  payload: SchoolListPayload;
}

export const fetchSchoolList = (
  schoolListType: SchoolListType,
  schoolList: string[]
): SchoolListActions => {
  return {
    type: FETCH_SCHOOLLIST,
    payload: { schoolListType, schoolList },
  };
};
