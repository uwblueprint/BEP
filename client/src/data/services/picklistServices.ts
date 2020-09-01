import {
  getUserPicklist,
  getSchoolPicklist,
  getEmployerPicklist
} from "../../utils/picklistApiUtils";
import { fetchPicklist } from "../actions/picklistActions";
import { PicklistType } from "../types/picklistTypes";

export function fetchUserPicklistService(picklistType: PicklistType) {
  return (dispatch: any) => {
    return getUserPicklist(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    });
  };
}

export function fetchSchoolPicklistService(picklistType: PicklistType) {
  return (dispatch: any) => {
    return getSchoolPicklist(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    });
  };
}

export function fetchEmployerPicklistService(picklistType: PicklistType) {
  console.log("HERE4")
  console.log(picklistType)
  return (dispatch: any) => {
    return getEmployerPicklist(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    });
  }
}