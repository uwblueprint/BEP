import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./ApiUtils";

const login = (email: string, password: string) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/auth/login`,
    method: "post",
    data: {
      email: `${email}`,
      password: `${password}`,
    },
  };

  return axios.request(config);
};

const register = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  educatorDesiredActivities: string[],
  schoolBoard: string,
  schoolName: string,
  position: string,
  introductionMethod: string,
  moreInfo: string[]
) => {
  const config: AxiosRequestConfig = {
    url: `${baseURL}api/auth/register`,
    method: "post",
    data: {
      email: `${email}`,
      password: `${password}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      phoneNumber: `${phoneNumber}`,
      educatorDesiredActivities: `${educatorDesiredActivities}`,
      schoolBoard: `${schoolBoard}`,
      schoolName: `${schoolName}`,
      position: `${position}`,
      introductionMethod: `${introductionMethod}`,
      moreInfo: `${moreInfo}`,
    },
  };

  return axios.request(config);
};

export { login, register };
