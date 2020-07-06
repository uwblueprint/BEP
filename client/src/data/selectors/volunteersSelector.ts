import { createSelector } from "reselect";
import { VolunteersState } from "../reducers/volunteersReducers";

const getVolunteersData = (state: VolunteersState) => {
  return state.list ? state.list : [];
};

export const getVolunteers = createSelector(
  [getVolunteersData],
  (volunteers) => volunteers
);
