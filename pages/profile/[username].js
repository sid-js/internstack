import React from "react";
import { HomeLayout } from "../../components/HomeLayout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Avatar } from "flowbite-react";
import {HiOutlineBuildingLibrary, HiOutlineMapPin} from 'react-icons/hi2'
import Head from "next/head";

const Profile = ({ Profile }) => {
  return (
    <HomeLayout>
      <Head>
        <title>{Profile.username} - Profile</title>
      </Head>
      <div className="flex flex-col w-full my-6 bg-white rounded-lg drop-shadow-md">
        <div className="flex flex-row rounded-t-lg h-36 bg-gradient-to-r from-blue-700 to-blue-500"></div>
        <div className="self-start px-8 -mt-28">
          <Avatar size="xl" img={Profile.avatar_url} rounded className="border-4 border-white rounded-full"/>
        </div>
        <div className="flex flex-col gap-1 px-8 py-3 bg-white rounded-lg h-fit">
          <p className="text-3xl font-bold">{Profile.full_name}</p>
          <p className="font-normal text-gray-500 text-md">{Profile.bio?(Profile.bio):("I'm loving Internstack. Looking for projects")}</p>
          <div className="flex flex-row items-center gap-4 py-3">
            <div className="flex flex-row items-center gap-2">
            <HiOutlineMapPin/><span className="text-base font-normal text-gray-500">{Profile.location?(Profile.location):("India")}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
            <HiOutlineBuildingLibrary/><span className="text-base font-normal text-gray-500">{Profile.education?(Profile.education):("Not provided")}</span>
            </div>
            
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const supabaseServer = createServerSupabaseClient(ctx);

  const getProfile = async (username) => {
    const { data: fetchedprofile } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();
    console.log(fetchedprofile);
    return fetchedprofile;
  };
  const { username } = ctx.params;
  const Profile = await getProfile(username);
  if (Profile) {
    return {
      props: {
        Profile,
      },
    };
  } else if (!Profile && ctx.session.user.username == username) {
    return {
      notFound: true,
    };
  }
};

export default Profile;
