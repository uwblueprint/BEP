import { FETCH_EVENTS } from "../actions/actionTypes";
import { Event } from "../types/EventTypes";

export interface EventsState {
    list: Event[];
    eventsFilter: string;

}

const initialState: EventsState = {
    list: [],
    eventsFilter: "ACTIVE"
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
                eventsFilter: action.filter,
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