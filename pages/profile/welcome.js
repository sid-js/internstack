import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import User1 from "../../public/users/user-1.jpg"
import User2 from "../../public/users/user-2.jpg"
import User3 from "../../public/users/user-3.jpg"
import User4 from "../../public/users/user-4.jpg"
import User5 from "../../public/users/user-5.jpg"

const Welcome = () => {
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [username,setUsername] = useState();
    const checkUsername = async () => {
        const {data,error} = await supabase.from("profiles").select("username").eq("username",session.user.id);
        if(data.username) {
            router.push("/");
        }
        else {
            router.push("/profile/onboarding");
        }
    }
    useEffect(() => {
        if(session){
            setTimeout(() => {
                checkUsername();
            }, 1000);
            
        }
      
    }, [session])
    
  return (
    <div className="py-16">
      <div className="container px-6 m-auto space-y-8 text-gray-500 md:px-12 lg:px-20">
        <div className="flex items-center justify-center -space-x-2">
          <Image
            loading="lazy"
            width={370}
            height={370}
            src={User3}
            alt="member photo"
            className="object-cover rounded-full w-14 h-14"
          />
          <Image
            loading="lazy"
            width={370}
            height={370}
            src={User2}
            alt="member photo"
            className="object-cover w-20 h-20 rounded-full"
          />
          <Image
            loading="lazy"
            width={370}
            height={370}
            src={User1}
            alt="member photo"
            className="z-10 object-cover rounded-full h-28 w-28"
          />
          <Image
            loading="lazy"
            width={370}
            height={370}
            src={User4}
            alt="member photo"
            className="relative object-cover w-20 h-20 rounded-full"
          />
          <Image
            loading="lazy"
            width={370}
            height={370}
            src={User5}
            alt="member photo"
            className="object-cover rounded-full w-14 h-14"
          />
        </div>
        <div className="m-auto space-y-6 md:w-8/12 lg:w-7/12">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white md:text-5xl">
            Welcome to Internstack
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300">
          <Spinner size="lg" className="px-2"/>
            You are being redirected...
            
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Welcome;
