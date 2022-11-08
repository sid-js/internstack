import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { TextInput, Button, Label, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import {HiOutlineMapPin,HiOutlineBuildingLibrary} from "react-icons/hi2";
import Select from "react-select";
import skillsoptions from "../../utils/skillsoptions";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

const Profile = (props) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [saving,setSaving] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    setSaving(true);
    const {err} = await supabase.from("profiles").update(data).eq("id",session.user.id);
    if(err) {
        toast.error("Unable to Save. Please try again.");
    }
    else {
        toast.success("Your Profile was updated Successfuly");
    }
    setSaving(false);


  }
  const initialBio = props.Profile.bio
    ? props.Profile.bio
    : "I'm loving Internstack!";
  const initialName = props.Profile.full_name;

  console.log(props.Profile);
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard - Profile</title>
      </Head>
      <div className="w-full p-5">
        <h1 className="text-3xl font-bold">Profile Details</h1>
        <form
          className="flex flex-col gap-4 py-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="block mb-2">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              name="name"
              id="name"
              type="text"
              defaultValue={initialName}
              {...register("full_name")}
              required={true}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="bio" value="Bio" />
            </div>
            <TextInput
              name="bio"
              id="bio"
              type="text"
              defaultValue={initialBio}
              {...register("bio")}
            />
          </div>
          <h1 className="mt-5 text-3xl font-bold ">About You</h1>
          <div>
            <div className="block mb-2">
              <Label htmlFor="skills" value="My Skills" />
            </div>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select {...field} isMulti options={skillsoptions} />
              )}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="location" value="City/Location" />
            </div>
            <TextInput
              name="location"
              id="location"
              type="text"
              icon={HiOutlineMapPin}
              placeholder="Bengaluru, India"
              {...register("location")}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="education" value="Education/University" />
            </div>
            <TextInput
              name="education"
              id="education"
              type="text"
              icon={HiOutlineBuildingLibrary}
              placeholder="Your university/college"
              {...register("education")}
            />
          </div>
          <div>
          <Button type="submit">{saving?(<><Spinner/>Saving..</>):(<>Save Profile</>)}</Button>
          </div>
          
        </form>
      </div>
    </DashboardLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const supabaseServer = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { data: Profile } = await supabaseServer
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return {
    props: {
      Profile,
    },
  };
};

export default Profile;
