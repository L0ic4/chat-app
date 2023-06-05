import {GetServerSideProps} from "next";
import axios from "axios";

const getData = async (url: string,context:any) => {
  
  const BASE_URL = "http://localhost:8080";

  const token = context.req.cookies.jetonJWT;

  return await axios.get(
      `${BASE_URL}/${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  );
}


export const getMessageChannel: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const messageData = (await getData(`messages/channel/${id}`, context)).data

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

export const getMessages: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    const messageData = (await getData(`messages/${id}`, context)).data

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
    const usersData = (await getData(`users`, context)).data

    const channelData = (await getData(`channel/${id}`, context)).data;

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

export const getUsersAndChannels: GetServerSideProps = async (context) => {
  try {

    const users = (await getData(`users`, context)).data

    const channels = (await getData(`channels`, context)).data

    return {
      props: {
        users,
        channels,
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

    const user = (await getData(`user`, context)).data

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
    const users = (await getData(`users`, context)).data
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
