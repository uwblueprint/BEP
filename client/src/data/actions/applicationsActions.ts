import { UPDATE_APPLICATION, CREATE_APPLICATION } from "./actionTypes";
import Application from "../types/applicationTypes";

export const updateApplication = (application: Application) => {
  return {
    type: UPDATE_APPLICATION,
    payload: { application },
  };
};

export const createAplication = (application: Application) => ({
  type: CREATE_APPLICATION,
  payload: { application },
});
