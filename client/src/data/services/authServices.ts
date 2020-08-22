import { login } from "../../utils/authApiUtils";
import { postLogin } from "../actions/authActions";
import { UserPicklistType } from "../types/userPicklistTypes";

export function fetchPicklistsService(email: string, password: string) {
  return (dispatch: any) => {
    return login(email, password).then((res: any) => {
      dispatch(postLogin(res.data));
      return res;
    });
  };
}
