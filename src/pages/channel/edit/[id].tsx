import { EditChannelForm } from "@/Components/editChannelForm";
import { Form } from "@/Components/form";
import { getUsersAndChannel } from "@/api/API";
import requireAuth from "@/security/ProtectedRoute";
import { CreateChannelPageProps } from "@/utils/types";
import { GetServerSideProps } from "next";

const UpdateChannel = ({ users, channel }: CreateChannelPageProps) => {
  return (
    <Form
      title="Create"
      component={<EditChannelForm users={users} channel={channel} />}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getUsersAndChannel;
export default requireAuth(UpdateChannel);
