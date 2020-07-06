import { FETCH_VOLUNTEERS } from "../actions/actionTypes";
import { Volunteer } from "../types/UserTypes";

export interface VolunteersState {
  list: Volunteer[];
  filteredList: Volunteer[];
  filters: string[];
}

const initialState: VolunteersState = {
  list: [],
  filteredList: [],
  filters: [],
};

export default function (
  state: VolunteersState = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_VOLUNTEERS:
      return {
        ...state,
        list: action.payload.list,
        filteredList: [],
      };

    default:
      return state;
  }
}
