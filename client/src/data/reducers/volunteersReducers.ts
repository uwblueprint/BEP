import { FETCH_VOLUNTEERS } from "../actions/actionTypes";
import { Volunteer } from "../types/userTypes";
import { VolunteersAction } from "../actions/volunteersActions";

export interface VolunteersPayload {
  list: Volunteer[];
}

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
  action: VolunteersAction
) {
  switch (action.type) {
    case FETCH_VOLUNTEERS:
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        filteredList: [],
      };

    default:
      return state;
  }
}
