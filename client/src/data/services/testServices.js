import { get } from '../../utils/ApiUtils';

export const fetchTestService = () => {
    // if test required params, pass param to this service: "/test/${param}/"
    return get("/test");
    
    /*.then((result) => {
        // check if success
        const { data } = result;
        console.log(data);
        return data;
    }).catch((err) => {
        console.log(err);
    });*/
};
