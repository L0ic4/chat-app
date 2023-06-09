import requireAuth from "@/security/ProtectedRoute";
import { FormLayout } from "@/Components/form/formLayout";
import { EditProfileForm } from "@/Components/profile/editProfileForm";
import { getUserDetails } from "@/api/API";
import { GetServerSideProps } from "next";
import { UserData } from "@/utils/types";
import Head from "next/head";

const Index = ({ user }: { user: UserData }) => {
  return (
    <>
      <Head>
        <title>YOUR PROFILE | Chat App</title>
      </Head>
      <FormLayout
        title="Your profile"
        component={<EditProfileForm user={user} />}
      />
    </>
  );
};

export default requireAuth(Index);
export const getServerSideProps: GetServerSideProps = getUserDetails;
