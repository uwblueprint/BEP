import Application from "../types/applicationTypes";
  import { create, update, getVolunteerApplications } from "../../utils/applicationsApiUtils";
import {
  createAplication,
  updateApplication,
} from "../actions/applicationsActions";
import { fetchUserApplications  } from '../actions/userActions';

export function updateApplicationService(application: Application) {
  return (dispatch: any) => {
    return update(application).then((res: any) => {
      dispatch(updateApplication(res.data));
      return res;
    });
  };
}

export function createApplicationService(application: Application) {
  return (dispatch: any) => {
    return create(application).then((res: any) => {
      dispatch(createAplication(application));
      return res;
    });
  };
}

export function fetchApplicationsByVolunteer(id: string) {
  return (dispatch: any) => {
    return getVolunteerApplications(id).then((res: any) => {
      dispatch(fetchUserApplications(res.data));
      return res.data;
    });
  };
}
