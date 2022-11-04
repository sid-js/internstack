import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
    const supabase = useSupabaseClient();
    const router = useRouter();
  const session = useSession();
  async function signout() {
    const { error } = await supabase.auth.signOut()
  }
  if(session){
    console.log(session);
  }
  return (
    <Navbar border fluid>
      <Navbar.Brand href="/">
        <img
          className="sm:h-16 md:h-20 px-6"
          src="/internstack-logo.svg"
          alt="Internstack"
        />
      </Navbar.Brand>
      <div className="flex md:order-2 gap-6">
        {!session ? (
          <Button onClick={()=>{router.push('/auth')}} gradientMonochrome="info" pill>
            Get Started
          </Button>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User"  img={session.user.user_metadata.avatar_url} rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{session.user.user_metadata.name}</span>
              <span className="block truncate text-sm font-medium">
                {session.user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
