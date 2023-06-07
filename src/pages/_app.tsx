import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { GetServerSideProps } from "next";
import { getUsersAndChannels } from "@/api/API";
const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <div className="flex">
      <Component {...pageProps} />
    </div>
  );
};
export default App; //TODO:alaina ny data rehetra de stockena quelque part
export const getServerSideProps: GetServerSideProps = getUsersAndChannels;
