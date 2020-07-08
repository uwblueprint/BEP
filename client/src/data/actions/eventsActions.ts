import { FETCH_EVENTS } from "./actionTypes";

export const fetchEvents = (events: any[]) => {
    return {
        type: FETCH_EVENTS,
        payload: { list: events },
    };
};