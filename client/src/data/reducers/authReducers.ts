import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/actionTypes";
import { User } from "../types/userTypes";

interface userState {
  loggedIn: boolean,
  token: string;
  user: User | null;
}

export interface userObject {
  user: userState,
}

const initialState: userState = {
  loggedIn: false,
  token: "",
  user: null
};

export default function (
  state: userState = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // todo: type the payload when registration and login are merged
      const user = action.payload.data && action.payload.data.user ? action.payload.data.user : null;
      const token = action.payload.data && action.payload.data.token ? action.payload.data.token : "";

      return {
        ...state,
        loggedIn: true,
        token,
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
