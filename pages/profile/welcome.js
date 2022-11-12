import Link from "next/link";
import React from "react";

const welcome = () => {
  return (
    <div className="py-16">
      <div className="container px-6 m-auto space-y-8 text-gray-500 md:px-12 lg:px-20">
        <div className="flex items-center justify-center -space-x-2">
          <img
            loading="lazy"
            width={370}
            height={370}
            src="/users/user-3.jpg"
            alt="member photo"
            className="object-cover rounded-full w-14 h-14"
          />
          <img
            loading="lazy"
            width={370}
            height={370}
            src="/users/user-2.jpg"
            alt="member photo"
            className="object-cover w-20 h-20 rounded-full"
          />
          <img
            loading="lazy"
            width={370}
            height={370}
            src="/users/user-1.jpg"
            alt="member photo"
            className="z-10 object-cover rounded-full h-28 w-28"
          />
          <img
            loading="lazy"
            width={370}
            height={370}
            src="/users/user-4.jpg"
            alt="member photo"
            className="relative object-cover w-20 h-20 rounded-full"
          />
          <img
            loading="lazy"
            width={370}
            height={370}
            src="/users/user-5.jpg"
            alt="member photo"
            className="object-cover rounded-full w-14 h-14"
          />
        </div>
        <div className="m-auto space-y-6 md:w-8/12 lg:w-7/12">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white md:text-5xl">
            Welcome to Internstack
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300">
            Be part of hundreds of developers, designers, writers and join internships and collaborative projects.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/profile/onboarding"
              className="relative flex items-center justify-center w-full h-12 px-8 before:absolute before:inset-0 before:rounded-full before:bg-blue-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white dark:text-dark">
                Create My Profile
              </span>
            </Link> 
            <p className="pt-10 text-sm text-center text-gray-600 dark:text-gray-300">
            You will be redirected to our user onboarding page where you will be prompted to fill your profile details.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default welcome;
