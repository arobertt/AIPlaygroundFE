import axios from "axios";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export const AIPlaygroundApiClient = axios.create({
  baseURL: "https://localhost:7004/api/",
  headers: defaultHeaders,
});
