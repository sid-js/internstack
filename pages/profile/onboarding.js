import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Alert, Button, Spinner } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InternstackIcon from "../../public/icon.svg"

const Onboarding = () => {
  const supabase = useSupabaseClient();
  const [available, setAvailable] = useState();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target.username.value;
    const { data: checkUsername, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();
    setLoading(false);
    if (checkUsername) {
      setAvailable(false);
    } else {
      setAvailable(true);
      const { error } = await supabase
        .from("profiles")
        .update({ username: username })
        .eq("id", session.user.id);
      if (error) {
        console.log(error);
        toast.error("Unable to create profile. Please try again.");
      } else {
        toast.success("Your Profile has been created successfully.");
        router.push("/profile/setup");
      }
    }
  };

  return (
    <div className="relative sm:py-6">
      <Head>
        <title>Onboarding - Profile</title>
      </Head>
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 transition duration-300 -space-x-52 opacity-40 delay-0"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-700 to-purple-500" />
      </div>
      <div className="relative px-6 m-auto text-gray-500 xl:container md:px-12">
        <div className="m-auto space-y-8 sm:w-4/5 md:w-3/5 xl:w-2/5">
          <div className="p-8 md:py-12">
            <Image
              src={InternstackIcon}
              loading="lazy"
              className="w-16"
              alt="Internstack Icon"
            />
            <h2 className="mt-20 mb-8 text-3xl font-bold text-gray-800 dark:text-white">
              Welcome to Internstack
            </h2>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <label
                  htmlFor="username"
                  className="text-gray-600 dark:text-gray-300"
                >
                  Enter a username for your profile and proceed to complete your
                  profile.
                </label>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute inset-y-0 w-6 h-6 my-auto left-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    pattern="^[A-Za-z][A-Za-z0-9_]{3,16}$"
                    autoComplete="username"
                    placeholder="Username"
                    className="block w-full h-12 pl-12 pr-4 text-gray-600 placeholder-gray-500 transition duration-300 bg-gray-100 border-none rounded-full focus:outline-none dark:bg-gray-800 dark:border-gray-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"
                  />

                  <div className="absolute right-0.5">
                    <Button
                      pill
                      type="submit"
                      className="relative flex items-center justify-center w-8 h-8 gap-3 ml-auto bg-blue-500 rounded-full sm:w-max sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                    >
                      {loading ? (
                        <Spinner className="mr-2" size="md"></Spinner>
                      ) : (
                        <></>
                      )}
                      <span className="relative hidden text-base font-semibold text-white dark:text-gray-900 sm:block">
                        Next
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="relative w-5 h-5 text-white dark:text-gray-900 sm:hidden"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
              {available == false ? (
                <Alert color="failure">
                  <span>
                    <span className="font-medium">Username not available</span>{" "}
                    Please enter a different username.
                  </span>
                </Alert>
              ) : (
                <></>
              )}
              <p className="text-sm text-gray-500">
                Username must only contain alphanumeric characters and
                underscores and must be greater than 4 characters.
                <br />
                <br />
              </p>
              <p className="pt-6 text-sm text-gray-500 border-t border-gray-100 dark:border-gray-700 dark:text-gray-400">
                Don&lsquo;t have an account
                <a href="#" className="text-primary">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  console.log("Checking Username")
  const supabaseServer = createServerSupabaseClient(ctx);
  const {
    data: { session },
    error,
  } = await supabaseServer.auth.getSession();
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }
  const { data: Profile } = await supabaseServer
    .from("profiles")
    .select("username")
    .eq("id", session.user.id)
    .single();
    console.log(Profile);
  
  if (Profile.username != null) {
    console.log("Username: " + Profile.username);
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    return {
      props: {Profile}
    }
  }
};
