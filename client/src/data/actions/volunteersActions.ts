import { FETCH_VOLUNTEERS } from "./actionTypes";
import { Volunteer } from "../types/userTypes";
import { VolunteersPayload } from "../reducers/volunteersReducers";

export interface VolunteersAction {
  type: string;
  payload: VolunteersPayload;
}

export const fetchVolunteers = (volunteers: Volunteer[]) => {
  return {
    type: FETCH_VOLUNTEERS,
    payload: { list: volunteers },
  };
};
