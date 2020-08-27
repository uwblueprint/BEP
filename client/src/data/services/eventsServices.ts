import { getActiveEvents, getPastEvents, getEvents, updateEvent } from "../../utils/EventsApiUtils";
import { fetchEvents, fetchActiveEvents, fetchPastEvents, updateEvent as updateEventAction } from "../actions/eventsActions";
import { Event } from "../types/EventTypes"

export function fetchEventsService(limit: number, offset: number) {
    return (dispatch: any) => {
        return getEvents(limit, offset).then((res: any) => {
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

export function updateEventService(event: Event){
    return (dispatch: any) => {
        return updateEvent(event).then((res: any) => {
            dispatch(updateEventAction(res.data));
            return res;
        });
    };
}
