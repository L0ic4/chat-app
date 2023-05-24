import { apiRequest } from "@/utils/fetchFromAPI";
import { UserData } from "@/utils/types";
import Cookies from "js-cookie";
import router from "next/router";

export const sendAuthData = async (
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  data: any
): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, false, data);
  if (response.status === 201) {
    await router.push("/login");
  } else if (response.status === 200) {
    if (response.data.user) {
      if (response.data.user.token != null) {
        Cookies.set("jetonJWT", response.data.user.token);
      }
    }
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
    await router.push("/chat");
  }
};
