import { get } from "../../utils/volunteersApiUtils";
import { fetchVolunteers } from "../actions/volunteersActions";

export function fetchVolunteersService(limit: number, offset: number) {
  return (dispatch: any) => {
    return get(limit, offset).then((res: any) => {
      dispatch(fetchVolunteers(res.data));
      return res;
    });
  };
}
