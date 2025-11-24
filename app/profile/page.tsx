"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || "User avatar"}
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
      )}
      <p className="text-2xl mb-2">{session?.user?.name}</p>
      <p className="text-lg">{session?.user?.email}</p>
    </div>
  );
};

export default ProfilePage;
