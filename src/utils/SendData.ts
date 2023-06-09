import { apiRequest } from "@/utils/fetchFromAPI";
import { MessageListData, SendDataProps, UserData } from "@/utils/types";
import Cookies from "js-cookie";
import router from "next/router";

export const sendAuthData = async ({
  endpoint,
  method,
  data,
  isToken,
}: SendDataProps): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, isToken, data);
  const token = response.data.user.token;

  if (response.status === 201) {
    await router.push("/login");
    return;
  }

  if (response.status === 200) {
    Cookies.set("jetonJWT", token);
    await router.push("/profile");
  }
};

export const updateProfile = async ({
  endpoint,
  method,
  data,
  isToken,
}: SendDataProps): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, isToken, data);

  if (response.status === 200) {
    await router.push("/profile");
  }
};

export const sendChannelData = async ({
  endpoint,
  method,
  data,
  isToken,
}: SendDataProps): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, isToken, data);

  if (response.status === 201) {
    await router.push("/profile");
  }
};

export const sendMessage = async ({
  endpoint,
  method,
  data,
  isToken,
}: SendDataProps): Promise<void> => {
  await apiRequest<MessageListData>(endpoint, method, isToken, data);
};
