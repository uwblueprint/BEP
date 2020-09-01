import { FETCH_SCHOOLS } from "../actions/actionTypes";
import { School } from "../types/schoolListTypes";
import { SchoolsAction } from "../actions/schoolListActions";

export interface SchoolsPayload {
  list: School[];
}

export type SchoolListState = {
  list: School[];
};

const initialState: SchoolListState = {
  list: [],
};

export default function (
  state: SchoolListState = initialState,
  action: SchoolsAction
) {
  switch (action.type) {
    case FETCH_SCHOOLS:
      return {
        ...state,
        list: state.list.concat(action.payload.list),
      };

    default:
      return state;
  }
}
