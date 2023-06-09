import { GetServerSideProps } from "next";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getSSRData = async (url: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(`${BASE_URL}/${url}`, { headers });
  return response.data;
};

export const getMessageChannel: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const token = context.req.cookies.jetonJWT;

    const messageData = await getSSRData(`messages/channel/${id}`, token);

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
  try {
    const { id } = context.query;
    const token = context.req.cookies.jetonJWT;

    const usersData = await getSSRData("users", token);
    const channelData = await getSSRData(`channel/${id}`, token);

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
    const user = await getSSRData("user", token);

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
    const users = await getSSRData("users", token);

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
