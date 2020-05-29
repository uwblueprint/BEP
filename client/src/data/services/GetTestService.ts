import { get } from '../../utils/ApiUtils';

export const getTestService = () => {
    // if test required params: "/test/${param}/"
    return get("/test");
    // sometimes we expect a callback for this function .then((response) => response);
}
