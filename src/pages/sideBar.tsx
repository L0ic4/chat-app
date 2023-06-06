import { Sidebar, Button } from "flowbite-react";
import Link from "next/link";
import { ChannelListData, UserListData } from "@/utils/types";
import { GetServerSideProps } from "next";
import { getUsersAndChannels } from "@/api/API";

export const SideBar = ({
  users,
  channels,
}: {
  users: UserListData;
  channels: ChannelListData;
}) => {
  return (
    <Sidebar className="h-screen flex-initial">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/profile">
            <p>Profil</p>
          </Sidebar.Item>
          <Sidebar.Collapse label="Users">
            {users?.users?.map((user) => (
              <Sidebar.Item key={user.id}>
                <Link href={"message/" + user.id}> {user.name}</Link>
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Channels">
            <Button>
              <Link href={"/channel/create"}>Créer</Link>
            </Button>

            {channels?.channels?.map((channel) => (
              <Sidebar.Item key={channel.id}>
                <Link href={"/channel/" + channel.id}>{channel.name}</Link>
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Sidebar.Item>
            <p>Déconnexion</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
