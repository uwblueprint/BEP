import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";

const getEventsData = (state: EventsState) => {
    return state.list ? state.list : [];
}

export const getEvents = createSelector(
    [getEventsData],
    (events) => events
);
