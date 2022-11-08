import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();
  const [username, setUsername] = useState();
  const getUsername = async () => {
    const {
      data: { username },
    } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", session.user.id)
      .single();
    setUsername(username);
  };

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }
  if (session) {
    console.log(session);
    console.log(username);
  }
  useEffect(() => {
    if (session) {
      getUsername();
    }
  }, [session]);

  return (
    <Navbar border fluid>
      <Navbar.Brand href="/">
        <img
          className="px-6 sm:h-8 md:h-14"
          src="/internstack-logo.svg"
          alt="Internstack"
        />
      </Navbar.Brand>
      <div className="flex gap-6 md:order-2">
        {!session ? (
          <Button
            onClick={() => {
              router.push("/auth");
            }}
            gradientMonochrome="info"
            pill
          >
            Get Started
          </Button>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <div className="flex items-center justify-between px-3 py-2 border border-gray-200 hover:bg-blue-100 rounded-xl">
                <span className="px-2 text-xl font-semibold">@{username}</span>
                <Avatar
                  alt="User"
                  img={session.user.user_metadata.avatar_url}
                  rounded={true}
                />
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {session.user.user_metadata.name}
              </span>
              <span className="block text-sm font-medium truncate">
                {session.user.email}
              </span>
            </Dropdown.Header>
            <Link
              href={username ? `/profile/${username}` : `/profile/onboarding`}
            >
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link href="/dashboard/profile">
              <Dropdown.Item>Settings</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
