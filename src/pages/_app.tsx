import "@/styles/globals.css";
import { useRouter } from "next/router";
import { SideBar } from "@/pages/sideBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSidebar = !["/login", "/sign-up"].includes(router.pathname);
  return (
    <div className="flex">
      {/* {showSidebar && <SideBar />} */}
      <Component {...pageProps} />
    </div>
  );
}
