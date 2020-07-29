import { get } from "../../utils/EventsApiUtils";
import { fetchEvents } from "../actions/eventsActions";

export function fetchEventsService(limit: number, offset: number, filter: string) {
    return (dispatch: any) => {
        return get(limit, offset).then((res: any) => {
            dispatch(fetchEvents(res.data, filter));
            return res;
        });
    };
}
