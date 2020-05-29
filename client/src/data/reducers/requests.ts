import { GET_REQUEST_TEST } from '../actions/requestActionTypes';

// this won't be necessary with individual reducers -> each will have its own action/action types to define structures
const initialState = {
    names: [],
    emails: [],
    existingData: 'some data from something else',
}

// we will use combineReducer to manage our separate reducers
export default function(state=initialState, action: {type: string, payload: any}) {
    switch (action.type) {
        case GET_REQUEST_TEST:
            console.log(action.payload);
            const newData = {names:['test']}
            return {
                ...state,
                newData
            }
        default:
            return state;
    }
}