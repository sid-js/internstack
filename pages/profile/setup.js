import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiOutlineMapPin, HiOutlineBuildingLibrary } from "react-icons/hi2";
import Select from "react-select";
import skillsoptions from "../../utils/skillsoptions";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { TextInput, Button, Label, Spinner, Textarea } from "flowbite-react";
import { useRouter } from "next/router";

const Setup = ({ Profile }) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const [formStep, setFormStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleNext = () => {
    setFormStep((prev) => prev + 1);
  };
  const onSubmit = async (data) => {
    console.log(data);
    const {error} = await supabase.from("profiles").update({data}).eq("id",session.user.id);
    if (error) {
      toast.error("Failed to update profile. Please try again.")
    }
    else {
      toast.error("Your profile was updated successfully.")
      router.push("/")
    }

  };
  return (
    <div className="relative my-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 transition duration-300 -space-x-52 opacity-40 delay-0"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-700 to-purple-500" />
      </div>
      <div className="container relative px-6 m-auto md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="p-8 my-12 sm:p-16">
            <div className="flex flex-row items-center gap-2">
              <img
                src="/icon.svg"
                loading="lazy"
                className="w-10"
                alt="tailus logo"
              />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Complete your profile <br />
              </h2>
            </div>
            <div className="my-6 bg-white border border-gray-100 shadow-2xl drop-shadow-md rounded-3xl dark:border-gray-700 dark:bg-gray-800 shadow-gray-600/10 dark:shadow-none">
              <div className="grid mt-4 space-y-4">
                <div className="w-full p-5">
                  <div className="text-sm ">Step {formStep + 1} of 3</div>

                  <form
                    className="flex flex-col gap-4 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {formStep >= 0 && (
                      <section className={formStep === 0 ? "block" : "hidden"}>
                        <h1 className="py-4 text-xl font-semibold">
                          Add a bio for your profile.
                        </h1>
                        <div>
                          <Textarea
                            name="bio"
                            id="bio"
                            type="textarea"
                            placeholder="I'm loving Internstack!"
                            {...register("bio", {
                              required: {
                                value: true,
                                message: "Please enter a bio.",
                              },
                              maxLength: {
                                value: 30,
                                message: "Please write a shorter bio.",
                              },
                              minLength: {
                                value: 3,
                                message: "Please enter a longer bio.",
                              },
                            })}
                          />
                        </div>
                        <div className="py-2">
                          {errors.bio && (
                            <p className="text-xs font-semibold text-blue-500">
                              {errors.bio?.message}
                            </p>
                          )}
                        </div>
                      </section>
                    )}
                    {formStep >= 1 && (
                      <section className={formStep === 1 ? "block" : "hidden"}>
                        <h1 className="py-4 mt-5 text-xl font-semibold">
                          Add skills to your profile.
                        </h1>
                        <div>
                          <Controller
                            name="skills"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Please select atleast 1 skill.",
                              },
                              validate: (value) => value.length >= 1,
                            }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isMulti
                                options={skillsoptions}
                              />
                            )}
                          />
                        </div>
                        <div className="py-2">
                          {errors.skills && (
                            <p className="text-xs font-semibold text-blue-500">
                              {errors.skills?.message}
                            </p>
                          )}
                        </div>
                      </section>
                    )}
                    {formStep >= 2 && (
                      <section className={formStep === 2 ? "block" : "hidden"}>
                        <div className="flex flex-col gap-4">
                          <h1 className="mt-5 text-xl font-semibold ">
                            Add more details about you.
                          </h1>
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
                              {...register("location", {
                                required: {
                                  value: true,
                                  message: "Please enter a location.",
                                },
                                minLength: {
                                  value: 3,
                                  message: "Please enter a proper location",
                                },
                                maxLength: {
                                  value: 30,
                                  message: "Please enter a proper location",
                                },
                              })}
                            />
                          </div>

                          <div>
                            <div className="block mb-2">
                              <Label
                                htmlFor="education"
                                value="Education/University"
                              />
                            </div>
                            <TextInput
                              name="education"
                              id="education"
                              type="text"
                              icon={HiOutlineBuildingLibrary}
                              placeholder="Your university/college"
                              {...register("education", {
                                required: {
                                  value: true,
                                  message:
                                    "Please enter your university/college.",
                                },
                                minLength: {
                                  value: 3,
                                  message: "Please enter a longer university name.",
                                },
                                maxLength: {
                                  value: 30,
                                  message: "Please enter a shorter university name",
                                },
                              })}
                            />
                          </div>
                        </div>
                        <div className="py-2">
                          {errors.location && (
                            <p className="text-xs font-semibold text-blue-500">
                              {errors.location?.message}
                            </p>
                          )}
                        </div>
                        <div className="py-2">
                          {errors.education && (
                            <p className="text-xs font-semibold text-blue-500">
                              {errors.education?.message}
                            </p>
                          )}
                        </div>
                      </section>
                    )}
                    {formStep === 2 ? (
                      <Button type="submit">
                        {saving ? (
                          <>
                            <Spinner />
                          </>
                        ) : (
                          <>Update My Profile</>
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        disabled={!isValid}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const supabaseServer = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();
  if(!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth"
      }
    }
  }
  return {
    props: {}
  }
}