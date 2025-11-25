"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import './Header.css';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="header bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <h1>My Blog</h1>
        </Link>
        <nav className="nav">
          {session ? (
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{session.user?.name}</span>
              <button onClick={() => signOut()} className="mr-4">
                Logout
              </button>
              <Link href="/post/create" className="mr-4">
                Create Post
              </Link>
            </div>
          ) : (
            <Link href="/login" className="mr-4">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
