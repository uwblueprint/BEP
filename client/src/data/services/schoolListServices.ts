import { getSchoolList } from "../../utils/schoolListApiUtils";
import { fetchSchoolList } from "../actions/schoolListActions";

export function fetchSchoolListService() {
  return (dispatch: any) => {
    return getSchoolList().then((res: any) => {
      dispatch(fetchSchoolList(res.data));
      return res;
    });
  };
}
