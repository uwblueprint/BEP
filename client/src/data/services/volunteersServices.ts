import { get } from "../../utils/volunteersApiUtils";
import { fetchVolunteers } from "../actions/volunteersActions";
import { getEventsOfVolunteer } from "../../utils/eventVolunteersApiUtils";
import { fetchVolunteerEvents } from "../actions/userActions";

export function fetchVolunteersService(limit: number, offset: number) {
  return (dispatch: any) => {
    return get(limit, offset).then((res: any) => {
      dispatch(fetchVolunteers(res.data));
      return res;
    });
  };
}

export function fetchEventsByVolunteer(id: string) {
  return (dispatch: any) => {
    return getEventsOfVolunteer(id).then((res: any) => {
      dispatch(fetchVolunteerEvents(res.data));
      return res.data;
    });
  };
};
