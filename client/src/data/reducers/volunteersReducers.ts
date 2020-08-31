import { FETCH_VOLUNTEERS, FETCH_VOLUNTEER_APPLICATIONS } from "../actions/actionTypes";
import { Volunteer } from "../types/userTypes";
import { VolunteersAction } from "../actions/volunteersActions";
import Application from "../types/applicationTypes";

export interface VolunteersPayload {
  list: Volunteer[];
  applications: Application[];
}

export interface VolunteersState {
  list: Volunteer[];
  filteredList: Volunteer[];
  filters: string[];
  applications: Application[];
}

const initialState: VolunteersState = {
  list: [],
  filteredList: [],
  filters: [],
  applications: [],
};

export default function (
  state: VolunteersState = initialState,
  action: VolunteersAction
) {
  switch (action.type) {
    case FETCH_VOLUNTEERS:
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        filteredList: [],
      };
    case FETCH_VOLUNTEER_APPLICATIONS:
      const { applications } = action.payload;
      return {
        ...state,
        applications
      }
    default:
      return state;
  }
}
