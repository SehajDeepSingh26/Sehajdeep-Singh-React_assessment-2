import axios from "axios";

export const axiosInstance = axios.create({})

export const apiConnector = (method, url, params) => {
    return axiosInstance({
        method: method,
        url: url,
        params: params ? params : null
    })
}