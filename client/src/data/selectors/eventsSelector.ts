import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventReducers";

const getEventsData = (state: EventsState) => {
    return state.list ? state.list : [];
};

export const getVolunteers = createSelector(
    [getEventsData],
    (events) => events
);