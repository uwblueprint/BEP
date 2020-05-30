import { getRequestTestService } from '../services/requests';

import { GET_REQUEST_TEST } from './actionTypes';

export function getRequestTest() {
    return {
        type: GET_REQUEST_TEST,
        // TODO: setup redux saga here for proper promise handling
        payload: getRequestTestService()
    };
}
