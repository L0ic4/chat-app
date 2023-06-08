import { SideBar } from "@/Components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isLoginOrSignUp =
    router.pathname === "/login" || router.pathname === "/sign-up";
  return (
    <div className="flex">
      {!isLoginOrSignUp && <SideBar />}
      <Component {...pageProps} />
    </div>
  );
};
export default App;
