import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const TOKEN = Cookies.get("jetonJWT");
const requireAuth = (WrappedComponent: any) => {
  const WithAuth: NextPage = (props) => {
    const router = useRouter();
    useEffect(() => {
      if (!TOKEN) {
        router.push("/login");
      }
    }, [router]);
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default requireAuth;
