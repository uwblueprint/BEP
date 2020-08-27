import { FETCH_EVENTS, CHANGE_EVENTS_FILTER } from "./actionTypes";
import { Event } from '../types/EventTypes'

// export const fetchEvents = (events: any[]) => ({
//     type: FETCH_EVENTS,
//     payload: { list: events }
// })

export const fetchEvents = (events: Event[]) => ({
    type: FETCH_EVENTS,
    payload: { list: events },
})

export const changeFilter = (filter: any) => ({
    type: CHANGE_EVENTS_FILTER,
    filter
})

export const eventsFilter = {
    ACTIVE_EVENT: 'ACTIVE_EVENT',
    PAST_EVENT: 'PAST_EVENT'
}