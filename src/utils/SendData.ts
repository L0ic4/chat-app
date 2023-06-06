import {apiRequest} from "@/utils/fetchFromAPI";
import {MessageData, SendDataProps, UserData} from "@/utils/types";
import Cookies from "js-cookie";
import router from "next/router";
import axios from "axios";


// const API = {
//   login: async (email:string, password:string) => {
//     try {
//       let SERVER_BASE_URL= "localhost";
//       return await axios.post(
//           `${SERVER_BASE_URL}/users/login`,
//           JSON.stringify({user: {email, password}}),
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//       );
//     } catch (error:any) {
//       return error.response;
//     }
//   },
//   register: async (username:string, email:string, password:string) => {
//     try {
//       let SERVER_BASE_URL= "localhost";
//       return await axios.post(
//           `${SERVER_BASE_URL}/users`,
//           JSON.stringify({user: {username, email, password}}),
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//       );
//     } catch (error:any) {
//       return error.response;
//     }
//   },
// }
//
// export default API;


export const sendAuthData = async ({
  endpoint,
  method,
  data,
  isToken,
}: SendDataProps): Promise<void> => {
  const response = await apiRequest<UserData>(endpoint, method, isToken, data);
  const token = response.data.user!.token;
  if (response.status === 201) {
    await router.push("/login");
  } else if (response.status === 200) {
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
  const response = await apiRequest<MessageData>(
    endpoint,
    method,
    isToken,
    data
  );
  if (response.status === 201) {
    router.reload();
  }
};
