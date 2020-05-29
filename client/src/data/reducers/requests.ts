import { GET_REQUEST_TEST } from '../actions/requestActionTypes';

// this won't be necessary with individual reducers -> each will have its own action/action types to define structures
const initialState = {
    names: [],
    emails: []
}

// we will use combineReducer to manage our separate reducers
export default function(state=initialState, action: {type: string}) {
    switch (action.type) {
        case GET_REQUEST_TEST:
            console.log("hit reducer!");
            return state;
        default:
            return state;
    }
}