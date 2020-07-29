import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";

const getEventsStatus = (state: EventsState) => state.eventsFilter

const getEventsData = (state: EventsState) => {
    return state.list ? state.list : []
}

export const getFilteredEvents = createSelector(
    [getEventsStatus, getEventsData],
    (eventsFilter, events) => {
        switch (eventsFilter) {
            case 'ACTIVE':
                return events.filter(t => t.isActive)
            case 'PAST':
                return events.filter(t => !t.isActive)
        }
    }
)
