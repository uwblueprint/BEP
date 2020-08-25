import { get } from "../../utils/picklistApiUtils";
import { fetchPicklist } from "../actions/picklistActions";
import { PicklistType } from "../types/picklistTypes";

export function fetchPicklistsService(picklistType: PicklistType) {
  return (dispatch: any) => {
    return get(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    });
  };
}
