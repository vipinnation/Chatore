import React, { useState } from "react";
import AlertComponent from "../../components/alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { forgotPassword } from "../../utils/api_url";
import { headers } from "../../utils/config";
import axios from "axios";

const ForgotPassword = () => {
  const [error, setError] = useState({
    type: "",
    message: "",
  });
  const [email, setEmail] = useState("");

  const [isLoader, setIsLoader] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!email.trim())
      setError({ type: "WARNING", message: "Email is required" });
    else {
      try {
        let res = await axios.post(`${forgotPassword}`, email, headers);
      } catch (error: any) {
        console.log(error);
      }
    }
    removeNotification();
  };

  const removeNotification = () => {
    setTimeout(() => {
      setError({ type: "", message: "" });
    }, 1500);
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
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={submitHandler}>
            <AlertComponent type={error.type} message={error.message} />
            <div className="flex flex-col pt-4">
              <TextField
                id="filled-multiline-flexible"
                label="Email"
                variant="standard"
                helperText={
                  error.message ? error.message : "Enter you registered email"
                }
                error={error.type ? true : false}
              />
            </div>

            <div className="pt-4 w-full">
              <LoadingButton
                loading={isLoader}
                variant="contained"
                className="btn btn-primary w-full"
                type="submit"
              >
                Log in
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

export default ForgotPassword;
