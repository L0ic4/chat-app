import { GetServerSideProps } from "next";
import axios from "axios";
import {
  ChannelData,
  MessageData,
  UserData,
  UserListData,
} from "@/utils/types";

export const getMessages: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const token = context.req.cookies.jetonJWT;

    const ChannelResponse = await axios.get<MessageData>(
      `http://localhost:8080/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const messageData = ChannelResponse.data;

    return {
      props: {
        messageData,
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

export const getUserDetails: GetServerSideProps = async (context) => {
  try {
    const token = context.req.cookies.jetonJWT;
    const response = await axios.get<UserData>("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    return {
      props: {
        user,
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

export const getAllUsers: GetServerSideProps = async (context) => {
  try {
    const token = context.req.cookies.jetonJWT;
    const response = await axios.get<UserListData>(
      "http://localhost:8080/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = response.data;
    return {
      props: {
        users,
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
