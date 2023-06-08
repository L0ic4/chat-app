import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

type AxiosHeaders = AxiosRequestConfig["headers"];

const BASE_URL = "http://localhost:8080";
const TOKEN = Cookies.get("jetonJWT");

export const apiRequest = async <T>(
  endpoint: string,
  method: "post" | "put" | "get",
  requireToken: boolean,
  data?: any
): Promise<Promise<AxiosResponse<any>> | any> => {
  const headers: AxiosHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (requireToken) {
    if (!TOKEN) throw new Error("JWT invalid");
    headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  const url = `${BASE_URL}/${endpoint}`;

  return axios({ url, method, headers, data });
};
