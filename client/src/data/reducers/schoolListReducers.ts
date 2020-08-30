import { FETCH_SCHOOLS } from "../actions/actionTypes";
import { School } from "../types/schoolListTypes";
import { SchoolListActions } from "../actions/schoolListActions";

export type SchoolListState = {
  list: School[];
};

const initialState: SchoolListState = {
  list: [],
};

export default function (
  state: SchoolListState = initialState,
  action: SchoolListActions
) {
  switch (action.type) {
    case FETCH_SCHOOLLIST:
      return {
        ...state,
        [SchoolListType[action.payload.schoolListType]]:
          action.payload.schoolList,
      };

    default:
      return state;
  }
}
