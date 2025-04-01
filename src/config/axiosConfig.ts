import axios from "axios";
import useAuthentication from "../hooks/useAuthentication.ts";

const instance = axios.create({
  baseURL: "https://localhost:5179/api/v1",
});

instance.interceptors.request.use((config) => {
  const authentication = useAuthentication();
  const accessToken = authentication.authentication?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default instance;
