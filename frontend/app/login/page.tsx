'use client';
import { FormGroup, FormControlLabel, Checkbox, InputAdornment } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import InputField from '@/components/forms/input.component';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { AuthAPI } from '@/services/api-calls/auth.api-calls';
import { useSnackbar } from '@/components/alert/alert.context';
import { CookieProvider } from '@/utils/cookies.util';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const { toastMessage } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data: any) => {
    try {
      setIsLoading((_prev) => true);
      let res: any = await AuthAPI.login(data);
      await CookieProvider.saveCookies('token', res.token);
      await CookieProvider.saveCookies('_id', res._id);
      setIsLoading((_prev) => false);
      router.push('/chats');
    } catch (error) {
      console.log(error);
      toastMessage(error, 'error');
      setIsLoading((_prev) => false);
    }
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
        <img
          alt="loginpage"
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col pt-20 md:pt-0">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="md:text-center text-3xl">Welcome to Chat-Ore</p>

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(submitHandler)}>
            <InputField
              name="email"
              label="Email"
              type="email"
              InputProps={{
                ...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address'
                  }
                })
              }}
              isError={errors && errors.email ? true : false}
              errors={errors.email}
            />

            <InputField
              name="password"
              label="Password"
              type={isPassword == true ? 'password' : 'text'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {isPassword == false ? (
                      <FaEye onClick={() => setIsPassword((_prev) => true)} />
                    ) : (
                      <FaEyeSlash onClick={() => setIsPassword((_prev) => false)} />
                    )}
                  </InputAdornment>
                ),
                ...register('password', {
                  required: true
                })
              }}
              isError={errors && errors.password ? true : false}
              errors={errors.password}
            />

            <div className="flex items-center justify-between  pt-4">
              <Link href="/forgot-password">
                <span className="font-medium hover:text-blue-600">Forgot Password ?</span>
              </Link>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </FormGroup>
            </div>

            <div className="pt-4 w-full">
              <LoadingButton loading={isLoading} variant="contained" className="w-full bg-primary" type="submit">
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
