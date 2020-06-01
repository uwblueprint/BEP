import { get } from '../../utils/ApiUtils';
import { fetchTest } from '../actions/testActions';

export function fetchTestService() {
    return (dispatch:any) => {
        return get('test')
            //.then(handleErrors)
            .then((res:any) => {
                dispatch(fetchTest(res));
                return res;
            })
    }
};
