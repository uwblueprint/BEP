import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const get = () => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/`,
        method: "get",
    };

    return axios.request(config);
};

export { get };