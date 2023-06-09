import { EditChannelForm } from "@/Components/channel/editChannelForm";
import { FormLayout } from "@/Components/form/formLayout";
import { getUsersAndChannel } from "@/api/API";
import requireAuth from "@/security/ProtectedRoute";
import { CreateChannelPageProps } from "@/utils/types";
import { GetServerSideProps } from "next";
import Head from "next/head";

const UpdateChannel = ({ users, channel }: CreateChannelPageProps) => {
  return (
    <>
      <Head>
        <title>UPDATE CHANNEL | Chat App</title>
      </Head>
      <FormLayout
        title="Edit channel"
        component={<EditChannelForm users={users} channel={channel} />}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = getUsersAndChannel;
export default requireAuth(UpdateChannel);
