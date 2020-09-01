import { FETCH_VOLUNTEERS, FETCH_VOLUNTEER_APPLICATIONS, FETCH_VOLUNTEER_INVITATIONS } from "../actions/actionTypes";
import { Volunteer } from "../types/userTypes";
import { VolunteersAction } from "../actions/volunteersActions";
import Application from "../types/applicationTypes";
import Invitation from "../types/invitationTypes";

export interface VolunteersPayload {
  list: Volunteer[];
  applications: Application[];
  invitations: Invitation[];
}

export interface VolunteersState {
  list: Volunteer[];
  filteredList: Volunteer[];
  filters: string[];
  applications: Application[];
  invitations: Invitation[];
}

const initialState: VolunteersState = {
  list: [],
  filteredList: [],
  filters: [],
  applications: [],
  invitations: [],
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
    case FETCH_VOLUNTEER_INVITATIONS:
      const { invitations } = action.payload;
      return {
        ...state,
        invitations
      }
    default:
      return state;
  }
}
