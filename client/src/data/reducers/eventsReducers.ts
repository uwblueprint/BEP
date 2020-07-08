import { FETCH_EVENTS } from "../actions/actionTypes";
import { Event } from "../types/EventTypes";

export interface EventsState {
    list: Event[];
}

const initialState: EventsState = {
    list: []
}

export default function (
    state: EventsState = initialState,
    action: { type: string; payload: any }
) {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                list: action.payload.list,
            };

        default:
            return state;
    }
}