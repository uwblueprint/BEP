import { FETCH_VOLUNTEERS,
  FETCH_LAST_NUM_VOLUNTEERS_RECEIVED,
  FETCH_VOLUNTEER_PAGE_NUM
} from "./actionTypes";
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

export const saveLastNumVolunteersReceived = (num: number) => {
  return {
    type: FETCH_LAST_NUM_VOLUNTEERS_RECEIVED,
    payload: num,
  }
}

export const saveVolunteerPageNum = (num: number) => {
  return {
    type: FETCH_VOLUNTEER_PAGE_NUM,
    payload: num,
  };
};