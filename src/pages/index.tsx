import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const TOKEN = Cookies.get("jetonJWT");

    if (TOKEN) {
      router.push("/chat").then(r => console.log("success"));
    } else {
      router.push("/login").then(r => console.log("success"));
    }
  }, [router]);

  return null;
}
