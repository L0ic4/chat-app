import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

type AxiosHeaders = AxiosRequestConfig["headers"];

const BASE_URL = "http://localhost:8080";
const TOKEN = Cookies.get("jetonJWT");

export const apiRequest = async <T>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  requireToken: boolean,
  data?: any
): Promise<AxiosResponse<T>> => {
  const headers: AxiosHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (requireToken) {
    if (!TOKEN) throw new Error("Jetton JWT non disponible");
    headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  const url = `${BASE_URL}/${endpoint}`;

  try {
    return await axios({ url, method, headers, data });
  } catch (error: any) {
    throw new Error(error);
  }
};
