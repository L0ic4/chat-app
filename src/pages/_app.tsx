import { SideBar } from "@/Components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const isLoginOrSignUp = pathname === "/login" || pathname === "/sign-up";

  return (
    <>
      <NextNProgress />
      <div className="flex">
        {!isLoginOrSignUp && <SideBar />}
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
