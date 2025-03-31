import axios from "axios";
import { BACKENDURL, CUSTOMERBACKENDURL } from "../constants/constent";

const baseURL = BACKENDURL;
const baseURLCustomer = CUSTOMERBACKENDURL;

export default axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivateCustomer = axios.create({
  baseURLCustomer,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
