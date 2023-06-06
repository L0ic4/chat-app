import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import {SideBar} from "@/pages/sideBar";
import {GetServerSideProps} from "next";
import {getUsersAndChannels} from "@/api/API";
const App = ({ Component, pageProps }: AppProps) => {
    console.log(pageProps)
  const router = useRouter();
  const showSidebar = !["/login", "/sign-up"].includes(router.pathname);
  return (
    <div className="flex">
        {showSidebar ?  <SideBar channels={pageProps} users={pageProps}/> : <div></div>}
      <Component {...pageProps} />
    </div>
  );
}
export default App;//TODO:alaina ny data rehetra de stockena quelque part 
export const getServerSideProps: GetServerSideProps = getUsersAndChannels;
