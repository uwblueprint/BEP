import { createSelector } from "reselect";
import { EventsState } from "../reducers/eventsReducers";

const getEventsStatus = (state: EventsState) => state.eventsFilter

const getEventsData = (state: EventsState) => {
    return state.list ? state.list : []
}

const getActiveEventsData = (state: EventsState) => {return state.activeList ? state.activeList : []}
const getPastEventsData = (state: EventsState) => {return state.pastList ? state.pastList : []}

export const getFilteredEvents = createSelector(
    [getEventsStatus, getActiveEventsData, getPastEventsData, getEventsData],
    (eventsFilter, activeEvents, pastEvents, allEvents) => {
        switch (eventsFilter) {
            case 'ACTIVE':
                return activeEvents;
            case 'PAST':
                return pastEvents;
        }
        return allEvents
    }
)