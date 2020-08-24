import { login } from "../../utils/authApiUtils";
import { loginRequest } from "../actions/authActions";

export function loginService(email: string, password: string) {
  return (dispatch: any) => {
    return login(email, password).then((res: any) => {
      console.log("SUCCESS");
      dispatch(loginRequest(res.data));
      return res;
    });
  };
}
