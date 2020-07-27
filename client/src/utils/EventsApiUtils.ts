import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const get = (limit: number, offset: number) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/?limit=${limit}&offset=${offset}`,
        method: "get",
    };

    return axios.request(config);
};

const getApplications = () => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/`
    }
}

const getSchoolInfo = () => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/`
    }
}

export { get };