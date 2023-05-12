import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

type AxiosHeaders = AxiosRequestConfig["headers"];

const BASE_URL = "http://localhost:8080";

export const apiRequest = async <T>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" = "get",
  data?: any,
  requireToken = false
): Promise<AxiosResponse<T>> => {
  const headers: AxiosHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (requireToken) {
    const token = localStorage.getItem("jetonJWT");
    if (!token) throw new Error("Jetton JWT non disponible");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${BASE_URL}/${endpoint}`;

  try {
    const response = await axios({ url, method, headers, data });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

