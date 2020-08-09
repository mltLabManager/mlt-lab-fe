import axios from "axios";
// import * as msalInstance from './msalInstance';

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000/backend/" : "/backend/";

const axiosConfig = {
  baseURL,
  url: baseURL,
};

const AxiosInstance = axios.create(axiosConfig);

export default AxiosInstance;
