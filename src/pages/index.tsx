import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const TOKEN = Cookies.get("jetonJWT");
    const destination = TOKEN ? "/profile" : "/login";
    router.push(destination);
  }, [router]);

  return null;
};

export default Home;
