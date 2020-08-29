import { get } from "../../utils/eventPicklistApiUtils";
import { fetchPicklist } from "../actions/eventPicklistActions";
import { EventPicklistType } from "../types/EventPicklistTypes";

export function fetchPicklistsService(picklistType: EventPicklistType) {
  return (dispatch: any) => {
    console.log("Picklisttype", picklistType)
    return get(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    }).catch((e) => {console.log("Error", e)});
  };
}