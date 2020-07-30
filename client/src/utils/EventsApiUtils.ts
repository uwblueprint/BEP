import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const get = (limit: number, offset: number) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/?limit=${limit}&offset=${offset}`,
        method: "get",
    };

    return axios.request(config);
};

const getApplications = async (eventName: string) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/applications/?name=${eventName}`,
        method: "get"
    };

    return await axios.request(config)
}

const getSchoolInfo = () => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/`
    }
}

export { get, getApplications };