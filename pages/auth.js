import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import React from "react";


const Auth = () => {
    const supabase = useSupabaseClient()
  async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: '/profile/onboarding'
          }
        })
      }
      async function signInWithGitHub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: '/profile/onboarding'
          }
        })
      }
      async function signInWithLinkedIn() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'linkedin',
          options: {
            redirectTo: '/profile/onboarding'
          }
        })
      }

  return (
    <div className="relative py-16">
      <Head>
        <title>Sign in - Internstack</title>
      </Head>
      <div className="container relative px-6 m-auto text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl dark:border-gray-700 dark:bg-gray-800 shadow-gray-600/10 dark:shadow-none">
            <div className="p-8 py-12 sm:p-16">
              <div className="space-y-4">
                <img
                  src="/icon.svg"
                  loading="lazy"
                  className="w-10"
                  alt="internstack icon"
                />
                <h2 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">
                  Sign in to unlock the <br />
                  best of Internstack.
                </h2>
              </div>
              <div className="grid mt-16 space-y-4">
                <button onClick={signInWithGoogle} className="relative flex items-center px-6 group h-11 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-700 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
                  <span className="relative flex items-center justify-center w-full gap-3 text-base font-medium text-gray-600 dark:text-gray-200">
                    <img
                      src="/icons/google-icon.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span>Continue with Google</span>
                  </span>
                </button>
                <button onClick={signInWithGitHub} className="relative flex items-center px-6 group h-11 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-700 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
                  <span className="relative flex items-center justify-center w-full gap-3 text-base font-medium text-gray-600 dark:text-gray-200">
                  <img
                      src="/icons/github-icon.svg"
                      className="absolute left-0 w-5"
                      alt="github logo"
                    />
                    <span>Continue with GitHub</span>
                  </span>
                </button>
                <button onClick={signInWithLinkedIn} className="relative flex items-center px-6 group h-11 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-700 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
                  <span className="relative flex items-center justify-center w-full gap-3 text-base font-medium text-gray-600 dark:text-gray-200">
                  <img
                      src="/icons/linkedin-icon.svg"
                      className="absolute left-0 w-5"
                      alt="linkedin logo"
                    />
                    <span>Continue with LinkedIn</span>
                  </span>
                </button>
              </div>
              <div className="mt-32 space-y-4 text-center text-gray-600 dark:text-gray-400 sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{" "}
                  and confirm you have read our
                  <a href="#" className="underline">
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
                <p className="text-xs">
                  This site is protected by reCAPTCHA and the
                  <a href="#" className="underline">
                    Google Privacy Policy
                  </a>{" "}
                  and
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
