import { get } from "../../utils/userPicklistApiUtils";
import { fetchPicklist } from "../actions/userPicklistActions";
import { UserPicklistType } from "./types/userPicklistTypes";

export function fetchPicklistsService(picklistType: UserPicklistType) {
  return (dispatch: any) => {
    return get(picklistType).then((res: any) => {
      dispatch(fetchPicklist(picklistType, res.data));
      return res;
    });
  };
}
