import { UserData } from "@/utils/types";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import requireAuth from "@/security/ProtectedRoute";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.jetonJWT;

  try {
    const response = await axios.get("http://localhost:8080/user", {
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

const Profile = ({ user }: { user: UserData }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>id</th>
          <th>email</th>
          <th>name</th>
          <th>bio</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th>deletedAt</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.user.id}</td>
          <td>{user.user.email}</td>
          <td>{user.user.name}</td>
          <td>{user.user.bio}</td>
          <td>{user.user.createdAt}</td>
          <td>{user.user.updatedAt}</td>
          <td>{user.user.deletedAt}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default requireAuth(Profile);
