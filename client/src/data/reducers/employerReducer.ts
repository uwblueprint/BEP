import { FETCH_EMPLOYERS, CREATE_EMPLOYER } from "../actions/actionTypes";
import Employer from "../types/employerTypes";

export interface EmployersState {
  list: Employer[];
}

const initialState: EmployersState = {
  list: [],
};

export default function (state: EmployersState = initialState, action: any) {
  switch (action.type) {
    case FETCH_EMPLOYERS:
      return {
        ...state,
        list: action.payload.employers,
      };
    case CREATE_EMPLOYER:
      return {
        ...state,
        list: state.list.concat(action.payload.employer),
      };
    default:
      return state;
  }
}
