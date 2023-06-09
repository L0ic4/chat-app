import { Sidebar, Button } from "flowbite-react";
import useSWR from "swr";
import { ChannelListData, UserListData } from "@/utils/types";
import { UserFetcher, ChannelFetcher } from "@/utils/FetchData";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from "js-cookie";

export const SideBar = () => {
  const router = useRouter();
  const REFRECH_INTERVAL = 1000;
  const userListData = useSWR<UserListData, Error>("usersList", UserFetcher, {
    refreshInterval: REFRECH_INTERVAL,
  }).data;
  const channelListData = useSWR<ChannelListData, Error>(
    "channelList",
    ChannelFetcher,
    {
      refreshInterval: REFRECH_INTERVAL,
    }
  ).data;

  const logout = (rooter: any) => {
    Cookies.remove("jetonJWT");
    rooter.reload();
  };

  return (
    <Sidebar className="h-screen flex-initial">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/profile">
            <p>
              <AiOutlineUser />
              Profil
            </p>
          </Sidebar.Item>
          <Sidebar.Collapse label="Users">
            {userListData?.users?.map((user) => (
              <Sidebar.Item key={user.id}>
                <Button onClick={() => router.push(`/message/${user.id}`)}>
                  {user.name}
                </Button>
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Channels">
            <Button onClick={() => router.push(`/channel/create`)}>
              Create
            </Button>
            {channelListData?.channels?.map((channel) => (
              <Sidebar.Item key={channel.id}>
                <Button onClick={() => router.push(`/channel/${channel.id}`)}>
                  {channel.name}
                </Button>
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Button onClick={() => logout(router)}>Log-Out</Button>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
