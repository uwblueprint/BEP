import { getActiveEvents, getPastEvents, getAllEvents } from "../../utils/EventsApiUtils";
import { fetchEvents, fetchActiveEvents, fetchPastEvents } from "../actions/eventsActions";

export function fetchEventsService(limit: number, offset: number) {
    return (dispatch: any) => {
        return getAllEvents(limit, offset).then((res: any) => {
            dispatch(fetchEvents(res.data));
            return res;
        });
    };
}

export function fetchActiveEventsService() {
    return (dispatch: any) => {
        return getActiveEvents().then((res: any) => {
            dispatch(fetchActiveEvents(res.data));
            return res;
        });
    };
}

export function fetchPastEventsService(limit: number, offset: number) {
    return (dispatch: any) => {
        return getPastEvents(limit, offset).then((res: any) => {
            dispatch(fetchPastEvents(res.data));
            return res;
        });
    };
}
