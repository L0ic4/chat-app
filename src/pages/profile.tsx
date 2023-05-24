import { UserData } from "@/utils/types";
import requireAuth from "@/security/ProtectedRoute";
import { GetServerSideProps } from "next";
import { getUserDetails } from "@/helpers/ReceiveData";

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
export const getServerSideProps: GetServerSideProps = getUserDetails;
export default requireAuth(Profile);
