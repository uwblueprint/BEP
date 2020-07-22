import { get } from "../../utils/EventsApiUtils";
import { fetchEvents } from "../actions/eventsActions";

export function fetchEventsService(isActive: boolean, limit: number, offset: number) {
    return (dispatch: any) => {
        return get(isActive, limit, offset).then((res: any) => {
            dispatch(fetchEvents(res.data));
            return res;
        });
    };
}
