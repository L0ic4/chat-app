import { useEffect } from "react";
import { useRouter } from "next/router";
//test
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jetonJWT");

    if (token) {
      router.push("/chat");
    } else {
      router.push("/auth");
    }
  }, [router]);

  return null;
}
