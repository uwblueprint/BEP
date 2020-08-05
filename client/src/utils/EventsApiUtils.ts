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

const getInvitations = async (eventName: string) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/invitations/?name=${eventName}`,
        method: "get"
    };

    return await axios.request(config)
}

const getVolunteers = async (eventName: string) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/volunteers/?name=${eventName}`,
        method: "get"
    };

    return await axios.request(config)
}

const updateApplicantStatus = async (eventName: string, applicantName: string, type: string) => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/applications/updatestate`,
        method: "patch",
        data: {
            event_name: eventName,
            applicant_name: applicantName,
            type:type
        }
    }

    return await axios.request(config)
}

const getSchoolInfo = async () => {
    const config: AxiosRequestConfig = {
        url: `${baseURL}api/events/`
    }
    return await axios.request(config)
}

export { get, getApplications, getInvitations, getSchoolInfo, getVolunteers, updateApplicantStatus};