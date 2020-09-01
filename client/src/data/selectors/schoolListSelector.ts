import { createSelector } from "reselect";
import { SchoolListState } from "../reducers/schoolListReducers";

const getSchoolListData = (state: SchoolListState) => {
  return state.list ? state.list : [];
};

export const getSchools = createSelector(
  [getSchoolListData],
  (schoolList) => schoolList
);
