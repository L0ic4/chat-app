import { apiRequest } from "@/utils/fetchFromAPI";
import { MessageData, UserData } from "@/utils/types";
import Cookies from "js-cookie";
import router from "next/router";

export const sendAuthData = async (
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  data: any,
  isToken: boolean = false
): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, isToken, data);
  if (response.status === 201) {
    await router.push("/login");
  } else if (response.status === 200) {
    Cookies.set("jetonJWT", response?.data?.user?.token);
    await router.push("/profile");
  }
};

export const sendChannelData = async (
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  data: any
): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, true, data);
  if (response.status === 201) {
    await router.push("/profile");
  }
};

export const sendMessage = async (
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  data: any
): Promise<void> => {
  const response = await apiRequest<MessageData>(endpoint, method, true, data);
  if (response.status === 201) {
    router.reload();
  }
};
