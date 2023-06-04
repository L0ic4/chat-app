import requireAuth from "@/security/ProtectedRoute";
import { Form } from "@/Components/form/formLayout";
import { EditProfileForm } from "@/Components/profile/editProfileForm";
import { getUserDetails } from "@/api/API";
import { GetServerSideProps } from "next";
import { UserData } from "@/utils/types";

const Profile = ({ user }: { user: UserData }) => {
  return <Form title="Your profile" component={<EditProfileForm user={user} />} />;
};

export default requireAuth(Profile);
export const getServerSideProps: GetServerSideProps = getUserDetails;
