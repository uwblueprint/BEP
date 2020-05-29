import { getRequestTestService } from '../services/requests';

import { GET_REQUEST_TEST } from './requestActionTypes';

export function getRequestTest() {
    return {
        type: GET_REQUEST_TEST,
        payload: getRequestTestService()
    };
}

