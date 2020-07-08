import { FETCH_EVENTS } from "../actions/actionTypes";
import { Event } from "../types/EventTypes";

export interface EventsState {
    list: Event[];
    filteredList: Event[];
    filters: string[];
}

const initialState: EventsState = {
    list: [],
    filteredList: [],
    filters: [],
};

export default function (
    state: EventsState = initialState,
    action: { type: string; payload: any }
) {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                list: action.payload.list,
                filteredList: [],
            };

        default:
            return state;
    }
}