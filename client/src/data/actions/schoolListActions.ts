import { FETCH_SCHOOLS } from "./actionTypes";
import { School } from "../types/schoolListTypes";

export const fetchSchoolList = (schoolList: School[]) => {
  return {
    type: FETCH_SCHOOLS,
    payload: { list: schoolList },
  };
};
