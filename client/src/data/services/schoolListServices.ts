import { get } from "../../utils/schoolListApiUtils";
import { fetchSchoolList } from "../actions/schoolListActions";
import { SchoolListType } from "../types/schoolListTypes";

export function fetchSchoolListService() {
  return (dispatch: any) => {
    return get().then((res: any) => {
      dispatch(fetchSchoolList(res.data));
      return res;
    });
  };
}
