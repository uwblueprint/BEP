import { login } from "../../utils/authApiUtils";
// import { register } from "../../utils/authApiUtils";

import { loginRequest } from "../actions/authActions";
// import { registerRequest } from "../actions/authActions";

export function loginService(email: string, password: string) {
  return (dispatch: any) => {
    return login(email, password).then((res: any) => {
      dispatch(loginRequest(res.data));
      return res;
    });
  };
}

// export function registerService(
//   email: string,
//   password: string,
//   firstName: string,
//   lastName: string,
//   phoneNumber: string,
//   educatorDesiredActivities: string[],
//   schoolBoard: string,
//   schoolName: string,
//   position: string,
//   introductionMethod: string,
//   moreInfo: string[]
// ) {
//   return (dispatch: any) => {
//     return register(
//       email,
//       password,
//       firstName,
//       lastName,
//       phoneNumber,
//       educatorDesiredActivities,
//       schoolBoard,
//       schoolName,
//       position,
//       introductionMethod,
//       moreInfo
//     ).then((res: any) => {
//       dispatch(registerRequest(res.data));
//       return res;
//     });
//   };
// }
