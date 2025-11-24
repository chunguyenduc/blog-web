"use client";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Login with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
