import axios from 'axios';

// need to change  api server side to use /api
const baseURL = 'http://localhost:3030/';

const get = (url) => {
    let config = {
        url: url,
        baseURL: baseURL,
        method: 'get'
    };

    return axios.request(config);
}

const post = (url, body) => {
    let config = {
        url: url,
        baseURL: baseURL,
        method: 'post',
        data: body
    };

    return axios.request(config);
}

export { post, get };


