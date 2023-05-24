import { UserData, UserListData } from "@/utils/types";
import axios from "axios";
import { GetServerSideProps } from "next";

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
      "http://localhost:8080/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = response.data.users;
    if (users) {
      return {
        props: {
          users,
        },
      };
    } else {
      return {
        props: {
          users: [],
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
      },
    };
  }
};
