import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/actionTypes";
import { User } from "../types/userTypes";

export interface userState {
  loggingIn: boolean;
  user: User | null;
}

const initialState: userState = {
  loggingIn: true,
  user: null
};

export default function (
  state: userState = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
      }
    case LOGIN_SUCCESS:
      // todo: type the payload when registration and login are merged
      const user = action.payload.data && action.payload.data.user ? action.payload.data.user : null;

      return {
        ...state,
        loggingIn: false,
        user
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
