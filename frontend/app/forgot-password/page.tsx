"use client";
import InputField from "@/components/forms/input.component";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { register } from "module";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const submitHandler = () => {
    try {
    } catch (error) {}
  };
  return (
    <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
        <img
          alt="forgotpassword"
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col pt-20 sm:pt-0">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Opps!, Don&apos;t worry</p>
          <span className="text-center">
            Just enter your email, we will send you a reset link
          </span>
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col pt-4">
              <div className="flex flex-col pt-4">
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  InputProps={{
                    ...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    }),
                  }}
                  isError={errors && errors.email ? true : false}
                  errors={errors.email}
                />
              </div>
            </div>

            <div className="pt-4 w-full">
              <LoadingButton
                loading={isLoading}
                variant="contained"
                className="btn bg-primary w-full"
                type="submit"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Want to try again?
              <Link href="/login">
                <span className="underline px-2">Login here.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
