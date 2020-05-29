import { getRequestTestService } from '../services/GetRequestTestService';

import { GET_REQUEST_TEST } from './requestActionTypes';

export function getRequestTest() {
    return {
        type: GET_REQUEST_TEST,
        payload: getRequestTestService()
    };
}