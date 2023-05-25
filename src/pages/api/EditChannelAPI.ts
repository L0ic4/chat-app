import { GetServerSideProps } from "next";
import axios from "axios";
import { ChannelData, UserListData } from "@/utils/types";

export const getUsersAndChannel: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const token = context.req.cookies.jetonJWT;

    const UsersResponses = await axios.get<UserListData>(
      "http://localhost:8080/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const usersData = UsersResponses.data;

    const ChannelResponse = await axios.get<ChannelData>(
      `http://localhost:8080/channel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const channelData = ChannelResponse.data;
    return {
      props: {
        users: usersData,
        channel: channelData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
