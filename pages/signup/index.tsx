import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AlertComponent from "../../components/alert";
import Link from "next/link";
import { signup } from "../../utils/api_url";
import { headers } from "../../utils/config";

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const [isLoader, setIsLoader] = useState(false);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setIsLoader(true);

    try {
      let { firstName, lastName, email, password, confirmPassword } = user;

      if (!firstName && !email && !password && !confirmPassword) {
        setError({ type: "WARNING", message: "All Field Required" });
      } else if (!firstName) {
        setError({ type: "WARNING", message: "Please enter name" });
      } else if (!email) {
        setError({ type: "WARNING", message: "Please enter email" });
      } else if (!password) {
        setError({ type: "WARNING", message: "Please enter password" });
      } else if (password != confirmPassword) {
        setError({ type: "WARNING", message: "Password Mismatch" });
      } else if (password.length <= 5) {
        setError({
          type: "WARNING",
          message: "Password should be of 6 characters",
        });
      } else {
        let res = await axios.post(`${signup}`, user, headers);
        setError({ type: "SUCCESS", message: res.data.msg });
      }
    } catch (error: any) {
      console.log("error ", error);
      setError({ type: "ERROR", message: error?.response?.data?.msg });
    }
    setIsLoader(false);
    removeNotification();
  };

  const removeNotification = () => {
    setTimeout(() => {
      setError({ type: "", message: "" });
    }, 2000);
  };
  return (
    <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
          alt="Background"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">
            Create you account and start chatting.
          </p>
          <form className="flex flex-col pt-1 md:pt-8" onSubmit={submitHandler}>
            <AlertComponent type={error.type} message={error.message} />
            <div className="flex flex-col pt-4">
              <TextField
                id="full-name"
                label="Full Name"
                type="text"
                className="flex"
                value={user.firstName}
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
                variant="standard"
              />
              <TextField
                id="last-name"
                label="Last Name"
                type="text"
                value={user.lastName}
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
                variant="standard"
              />
            </div>

            <div className="flex flex-col pt-4">
              <TextField
                id="email"
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                variant="standard"
              />
            </div>

            <div className="flex flex-col pt-4">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col pt-4">
              <TextField
                id="standard-confirmPassword-input"
                label="Confirm Password"
                type="password"
                variant="standard"
                value={user.confirmPassword}
                onChange={(e) => {
                  setUser({ ...user, confirmPassword: e.target.value });
                }}
              />
            </div>

            <div className="pt-4 w-full">
              <LoadingButton
                loading={isLoader}
                variant="contained"
                className="btn btn-primary w-full"
                type="submit"
              >
                Create Account
              </LoadingButton>
            </div>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Already have an account?
              <Link href="/login">
                <span className="underline px-2">Log in here.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
