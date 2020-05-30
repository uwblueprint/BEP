import { fetchTestService } from '../services/testServices';

import { FETCH_TEST } from './actionTypes';

export function fetchTest() {
    return {
        type: FETCH_TEST,
        // TODO: setup redux saga here for proper promise handling
    };
}
