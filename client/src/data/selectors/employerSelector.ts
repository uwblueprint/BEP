import { createSelector } from "reselect";

import { EmployersState } from "../reducers/employerReducer";

const getEmployersData = (state: EmployersState) => {
  return state.list ? state.list : [];
};

export const getEmployers = createSelector(
  [getEmployersData],
  (employers) => employers
);
