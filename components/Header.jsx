import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  HiDocumentMagnifyingGlass,
  HiPuzzlePiece,
  HiUsers,
  HiHome,
  HiMagnifyingGlass,
  HiUser,
} from "react-icons/hi2";
import Image from "next/image";

const Header = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();
  const [username, setUsername] = useState();
  const getUsername = async () => {
    if (session) {
      const { data: Profile, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();
      if (!error && Profile) {
        setUsername(Profile.username);
      }
    }
  };
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      toast.warn("You have been signed out.");
      router.push("/");
    }
  }
  if (session) {
    console.log("Session: " + session);
    console.log("Username" + username);
  }

  useEffect(() => {
    getUsername();
  }, [session]);

  return (
    <Navbar border fluid>
      <Navbar.Toggle />
      <Navbar.Brand href="/">
        <Image
          className="w-32 md:mx-16 md:w-52"
          src="/internstack-logo.svg"
          alt="Internstack"
        />
      </Navbar.Brand>
      <div className="flex md:order-1">
        {!session ? (
          <Button
            onClick={() => {
              router.push("/auth");
            }}
            gradientMonochrome="info"
            pill
          >
            Sign in
          </Button>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <div>
                  <div className="flex flex-row items-center justify-between px-1 py-2 border border-gray-200 md:px-3 hover:bg-blue-100 rounded-xl">
                <span className="px-2 text-xl font-semibold leading-relaxed">
                  {username ? `@${username}` : "Profile"}
                </span>
                <Avatar
                  alt="User"
                  img={session.user.user_metadata.avatar_url}
                  rounded={true}
                />
              </div>
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
      <Navbar.Collapse className="absolute left-0 z-50 px-2 mx-auto rounded-md top-20 bg-slate-100 md:hidden">
        <Navbar.Link
          className="rounded-lg"
          href="/"
          active={router.pathname == "/" ? true : false}
        >
          <div className="flex flex-row items-center w-full gap-3">
            <HiHome
              size={22}
              className={
                router.pathname == "/" ? "text-white" : "text-gray-500"
              }
            />
            <span className="text-lg font-semibold">Home</span>
          </div>
        </Navbar.Link>
        <Navbar.Link
          href="/internships"
          active={router.pathname == "/internships" ? true : false}
        >
          <div className="flex flex-row items-center w-full gap-3">
            <HiDocumentMagnifyingGlass
              size={22}
              className={
                router.pathname == "/internships" ? "text-white" : "text-gray-500"
              }
            />
            <span className="text-lg font-semibold">Internships</span>
          </div>
        </Navbar.Link>
        <Navbar.Link
          href="/projects"
          active={router.pathname == "/projects" ? true : false}
        >
          <div className="flex flex-row items-center w-full gap-3">
            <HiPuzzlePiece
              size={22}
              className={
                router.pathname == "/projects" ? "text-white" : "text-gray-500"
              }
            />
            <span className="text-lg font-semibold">Projects</span>
          </div>
        </Navbar.Link>
        <Navbar.Link
          href="/community"
          active={router.pathname == "/community" ? true : false}
        >
          <div className="flex flex-row items-center w-full gap-3">
            <HiUsers
              size={22}
              className={
                router.pathname == "/community" ? "text-white" : "text-gray-500"
              }
            />
            <span className="text-lg font-semibold">Community</span>
          </div>
        </Navbar.Link>{" "}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
