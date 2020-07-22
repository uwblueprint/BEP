import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const get = (isActive: boolean, limit: number, offset: number) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/?isEventActive=${isActive}`,
        method: "get",
    };

    return axios.request(config);
};

export { get };