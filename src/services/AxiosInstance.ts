import axios from "axios";
axios.defaults.withCredentials = true;
// import * as msalInstance from './msalInstance';

const baseURL = process.env.NODE_ENV == "development" ? "http://localhost:3001/backend/" : "/backend/";
//const baseURL = "/backend/";

const axiosConfig = {
  baseURL,
  url: baseURL,
};

const AxiosInstance = axios.create(axiosConfig);

export default AxiosInstance;
