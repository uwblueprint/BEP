import { login } from "../../utils/authApiUtils";
import { loginRequest, loginFailed } from "../actions/authActions";

export function loginService(email: string, password: string) {
  return (dispatch: any) => {
    return login(email, password)
      .then((res: any) => {
        dispatch(loginRequest(res.data));
        return res.data;
      })
      .catch((res: any) => {
        dispatch(loginFailed());
        return null;
      });
  };
}
