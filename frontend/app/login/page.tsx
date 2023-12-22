"use client";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/input.component";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const LoginPage = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data: any) => {
    console.log("Erros", errors);
    console.log(data);
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Welcome to Chat-Ore</p>

          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleSubmit(submitHandler)}
          >
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

            <InputField
              name="password"
              label="Password"
              type={isPassword == true ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {isPassword == false ? (
                      <FaEye onClick={(e) => setIsPassword((_prev) => true)} />
                    ) : (
                      <FaEyeSlash
                        onClick={(e) => setIsPassword((_prev) => false)}
                      />
                    )}
                  </InputAdornment>
                ),
                ...register("password", {
                  required: true,
                }),
              }}
              isError={errors && errors.password ? true : false}
              errors={errors.password}
            />

            <div className="flex items-center justify-between  pt-4">
              <Link href="/forgot-password">
                <span className="font-medium hover:text-blue-600">
                  Forgot Password ?
                </span>
              </Link>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </FormGroup>
            </div>

            <div className="pt-4 w-full">
              <LoadingButton
                loading={false}
                variant="contained"
                className="w-full bg-primary"
                type="submit"
              >
                Log in
              </LoadingButton>
            </div>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Don&apos;t have an account?
              <Link href="/signup">
                <span className="underline px-2">Register here.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
