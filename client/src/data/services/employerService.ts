import { getAllEmployers, create } from "../../utils/employersApiUtils";
import { fetchEmployers, createEmployer } from "../actions/employersActions";
import Employer from "../types/employerTypes";

export function fetchEmployersService() {
  return (dispatch: any) => {
    return getAllEmployers().then((res: any) => {
      dispatch(fetchEmployers(res.data));
      return res;
    });
  };
}

export function createEmployerService(employer: Employer) {
  return (dispatch: any) => {
    return create(employer).then((res: any) => {
      employer.id = res.data.id;
      dispatch(createEmployer(employer));
      return res;
    });
  };
}
