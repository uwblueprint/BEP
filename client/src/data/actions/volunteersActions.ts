import { FETCH_VOLUNTEERS } from "./actionTypes";

export const fetchVolunteers = (volunteers: any[]) => {
  return {
    type: FETCH_VOLUNTEERS,
    payload: { list: volunteers },
  };
};
