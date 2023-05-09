import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jetonJWT");

    if (token) {
      router.push("/chat");
      // localStorage.removeItem("jetonJWT");
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  return null;
}
