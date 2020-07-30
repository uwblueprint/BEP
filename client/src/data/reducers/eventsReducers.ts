import { FETCH_EVENTS, CHANGE_EVENTS_FILTER } from "../actions/actionTypes";
import { Event } from "../types/EventTypes";

export interface EventsState {
    list: Event[];
    eventsFilter: string;
    activeList: Event[];
    pastList: Event[];

}

const initialState: EventsState = {
    list: [],
    eventsFilter: "ACTIVE",
    activeList: [],
    pastList: [],
}

export default function eventsFilter(
    state: EventsState = initialState,
    action: { type: string; payload: any; filter: any }
) {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                list: action.payload.list,
                activeList: action.payload.list.filter((t: Event) => t.isActive),
                pastList: action.payload.list.filter((t: Event) => !t.isActive),
            }
        case CHANGE_EVENTS_FILTER:
            return {
                ...state,
                eventsFilter: action.filter
            }
        default:
            return state;
    }
}

// export default function eventsFilter(
//     state: EventsState = initialState,
//     action: { type: string; payload: any }
// ) {
//     switch (action.type) {
//         case FETCH_EVENTS:
//             return {
//                 ...state,
//                 list: action.payload.list,
//             };
//         default:
//             return state;
//     }
// }