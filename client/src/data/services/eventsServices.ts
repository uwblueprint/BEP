import { get } from "../../utils/EventsApiUtils";
import { fetchEvents } from "../actions/eventsActions";

export function fetchEventsService() {
    return (dispatch: any) => {
        return get().then((res: any) => {
            dispatch(fetchEvents(res.data));
            return res;
        });
    };
}