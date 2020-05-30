import { FETCH_TEST } from './actionTypes';

export const fetchTest = (data) => {
    return {
        type: FETCH_TEST,
        payload: { data }
    };
}
