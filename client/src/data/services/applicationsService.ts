import Application from "../types/applicationTypes";
import { create, update } from "../../utils/applicationsApiUtils";
import {
  createAplication,
  updateApplication,
} from "../actions/applicationsActions";

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
