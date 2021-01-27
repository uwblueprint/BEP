import { 
  FETCH_VOLUNTEERS, 
  FETCH_VOLUNTEER_APPLICATIONS, 
  FETCH_VOLUNTEER_INVITATIONS, 
  FETCH_EVENTS_OF_VOLUNTEER,
  FETCH_LAST_NUM_VOLUNTEERS_RECEIVED,
  FETCH_VOLUNTEER_PAGE_NUM,
} from "../actions/actionTypes";
import { Volunteer } from "../types/userTypes";
import { VolunteersAction } from "../actions/volunteersActions";
import Application from "../types/applicationTypes";
import Invitation from "../types/invitationTypes";
import EventVolunteer from "../types/eventVolunteerTypes"

export interface VolunteersPayload {
  list: Volunteer[];
  applications: Application[];
  invitations: Invitation[];
  events: EventVolunteer[];
}

export interface VolunteersState {
  list: Volunteer[];
  filteredList: Volunteer[];
  filters: string[];
  applications: Application[];
  invitations: Invitation[];
  events: EventVolunteer[];
  lastNumVolunteersRecieved: number;
  volunteerPageNumber: number;
}

const initialState: VolunteersState = {
  list: [],
  filteredList: [],
  filters: [],
  applications: [],
  invitations: [],
  events: [],
  lastNumVolunteersRecieved: 0,
  volunteerPageNumber: 0,
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
    case FETCH_EVENTS_OF_VOLUNTEER:
      const { events } = action.payload;
      return {
        ...state,
        events,
      }
    case FETCH_LAST_NUM_VOLUNTEERS_RECEIVED:
      return {
        ...state,
        lastNumVolunteersRecieved: action.payload
      };
    case FETCH_VOLUNTEER_PAGE_NUM:
      return {
        ...state,
        volunteerPageNumber: action.payload
      };
    default:
      return state;
  }
}
