import { get } from "../../utils/eventPicklistApiUtils";
import { fetchPicklist } from "../actions/eventPicklistActions";
import { EventPicklistType } from "../types/EventPicklistTypes";

export function fetchPicklistsService(picklistType: EventPicklistType) {
  return (dispatch: any) => {
    return get(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    });
  };
}