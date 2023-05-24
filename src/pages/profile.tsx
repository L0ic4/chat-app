import { UserData } from "@/utils/types";
import { GetServerSideProps, NextPage } from "next";
import Cookies from "js-cookie";
import axios from "axios";
import requireAuth from "@/security/ProtectedRoute";
interface UserDetailsProps {
  userDetails: UserData;
}

export const getServerSideProps = async (context: any) => {
  const TOKEN = Cookies.get("jetonJWT");
  try {
    const response = await axios.get("localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const userDetails = response.data;

    return {
      props: {
        userDetails,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

const Profile: NextPage<UserDetailsProps> = ({ userDetails }) => {
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
          <td>{userDetails.user.id}</td>
          <td>{userDetails.user.email}</td>
          <td>{userDetails.user.name}</td>
          <td>{userDetails.user.bio}</td>
          <td>{userDetails.user.createdAt}</td>
          <td>{userDetails.user.updatedAt}</td>
          <td>{userDetails.user.deletedAt}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default requireAuth(Profile);
