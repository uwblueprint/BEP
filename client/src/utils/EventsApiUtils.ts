import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const get = () => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/event-test-2`,
        method: "get",
    };

    return axios.request(config);
};

export { get };