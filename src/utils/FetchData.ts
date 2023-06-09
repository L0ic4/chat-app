import { apiRequest } from "./fetchFromAPI";

const request = async (endpoint: string): Promise<any> => {
  const response = await apiRequest(endpoint, "get", true);
  return response.data;
};

export const UserFetcher = async () => {
  return await request("users");
};

export const ChannelFetcher = async () => {
  return await request("channels");
};

export const MessageFetcher = async (channelId: string) => {
  return await request(`messages/channel/${channelId}`);
};

export const MessageUserFetcher = async (userId: string) => {
  return await request(`messages/${userId}`);
};
