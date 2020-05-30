import { FETCH_TEST } from '../actions/actionTypes';

// this won't be necessary with individual reducers -> each will have its own action/action types to define structures
const initialState = {
    users: [],
}

// we will use combineReducer to manage our separate reducers
export default function(state=initialState, action: {type: string, payload: any}) {
    switch (action.type) {
        case FETCH_TEST:
            const { data } = action.payload;
            const users = data.data;
            return {
                ...state,
                users
            }
        default:
            return state;
    }
}