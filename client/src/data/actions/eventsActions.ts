import { FETCH_EVENTS } from "./actionTypes";

// export const fetchEvents = (events: any[]) => ({
//     type: FETCH_EVENTS,
//     payload: { list: events }
// })

export const fetchEvents = (events: any[], filter: any) => ({
    type: FETCH_EVENTS,
    payload: { list: events },
    filter
})

export const eventsFilter = {
    ACTIVE_EVENT: 'ACTIVE_EVENT',
    PAST_EVENT: 'PAST_EVENT'
}