import { CreateChannelForm } from "@/Components/channel/createChannelForm";
import { FormLayout } from "@/Components/form/formLayout";
import { getAllUsers } from "@/api/API";
import requireAuth from "@/security/ProtectedRoute";
import { UserListData } from "@/utils/types";
import { GetServerSideProps } from "next";
import Head from "next/head";

const Create = ({ users }: { users: UserListData }) => {
  return (
    <>
      <Head>
        <title>CREATE CHANNEL | Chat App</title>
      </Head>
      <FormLayout
        title="Create Channel"
        component={<CreateChannelForm users={users} />}
      />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = getAllUsers;
export default requireAuth(Create);
