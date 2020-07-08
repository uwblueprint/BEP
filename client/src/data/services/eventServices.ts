import { get } from "../../utils/EventsApiUtils";
import { fetchEvents } from "../actions/eventActions";

export function fetchVolunteersService(limit: number, offset: number) {
    return (dispatch: any) => {
        return get(limit, offset).then((res: any) => {
            dispatch(fetchEvents(res.data));
            return res;
        });
    };
}