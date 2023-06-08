import { EditChannelForm } from "@/Components/channel/editChannelForm";
import { FormLayout } from "@/Components/form/formLayout";
import { getUsersAndChannel } from "@/api/API";
import requireAuth from "@/security/ProtectedRoute";
import { CreateChannelPageProps } from "@/utils/types";
import { GetServerSideProps } from "next";

const UpdateChannel = ({ users, channel }: CreateChannelPageProps) => {
  return (
    <FormLayout
      title="Edit channel"
      component={<EditChannelForm users={users} channel={channel} />}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getUsersAndChannel;
export default requireAuth(UpdateChannel);
