import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import AlertComponent from "../../components/alert/index";
import LoadingButton from "@mui/lab/LoadingButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { login } from "../../utils/api_url";
import { setCookie, getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
      let { email, password } = user;

      if (!email.trim() && !password.trim()) {
        setError({ type: "WARNING", message: "All Field Required" });
        setIsLoader(false);
      } else if (!email.trim()) {
        setError({ type: "WARNING", message: "Email is required" });
        setIsLoader(false);
      } else if (!password.trim()) {
        setError({ type: "WARNING", message: "Password is required" });
        setIsLoader(false);
      } else {
        let res = await axios.post(`${login}`, user, {
          headers: { "Content-Type": "application/json" },
        });
        setCookie("auth-token", res.data.token);
        setCookie("user-id", res.data._id);
        setCookie("username", `${res.data.firstName} ${res.data.lastName}`);
        setIsLoader(false);
        router.push("/chats");
      }
    } catch (error: any) {
      console.log("Login Page Error ", error);
      setError({ type: "ERROR", message: error?.response?.data?.msg });
      setIsLoader(false);
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
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                variant="standard"
              />
            </div>

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    let token = getCookie("auth-token", context);
    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: "/chats",
        },
        props: {},
      };
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};

export default Login;
