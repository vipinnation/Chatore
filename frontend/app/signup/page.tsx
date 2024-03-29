'use client';
import { useSnackbar } from '@/components/alert/alert.context';
import InputField from '@/components/forms/input.component';
import { AuthAPI } from '@/services/api-calls/auth.api-calls';
import { LoadingButton } from '@mui/lab';
import { InputAdornment } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupPage = () => {
  const router = useRouter();
  const { toastMessage } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm();

  const confirmPassword = watch('confirm_password', '');
  const password = watch('password', '');

  const submitHandler = async (user: any) => {
    try {
      setIsLoading((_prev) => true);
      let { confirm_password, ...rest } = user;
      let data = await AuthAPI.registration(rest);
      toastMessage(data.msg, 'success');
      setIsLoading((_prev) => false);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.log('API ERRO ', error);
      toastMessage(error, 'error');
      setIsLoading((_prev) => false);
    }
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
          alt="SignUp Page"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col pt-16 sm:pt-12 ">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Create you account and start chatting.</p>
          <form className="flex flex-col pt-1 md:pt-8" onSubmit={handleSubmit(submitHandler)}>
            {/* Full name  */}
            <div className="flex flex-col pt-4">
              <InputField
                id="full-name"
                label="Full Name"
                type="text"
                name="full_name"
                className="flex"
                InputProps={{
                  ...register('full_name', {
                    required: true
                  })
                }}
                isError={errors && errors.full_name ? true : false}
                errors={errors.full_name}
              />
            </div>

            {/* // Email */}
            <div className="flex flex-col pt-4">
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
            </div>

            <div className="flex flex-col pt-4">
              <InputField
                name="password"
                label="Password"
                type={isPassword == true ? 'password' : 'text'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" className="cursor-pointer">
                      {isPassword == false ? (
                        <FaEye onClick={() => setIsPassword((_prev) => true)} />
                      ) : (
                        <FaEyeSlash onClick={() => setIsPassword((_prev) => false)} />
                      )}
                    </InputAdornment>
                  ),
                  ...register('password', {
                    required: true,
                    validate: (value) => value === confirmPassword || 'Passwords do not match'
                  })
                }}
                isError={errors && errors.password ? true : false}
                errors={errors.password}
              />
            </div>

            <div className="flex flex-col pt-4">
              <InputField
                name="confirm_password"
                label="Confirm Password"
                type={isConfirmPassword == true ? 'password' : 'text'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" className="cursor-pointer">
                      {isConfirmPassword == false ? (
                        <FaEye onClick={() => setIsConfirmPassword((_prev) => true)} />
                      ) : (
                        <FaEyeSlash onClick={() => setIsConfirmPassword((_prev) => false)} />
                      )}
                    </InputAdornment>
                  ),
                  ...register('confirm_password', {
                    required: true,
                    validate: (value) => value === password || 'Passwords do not match'
                  })
                }}
                isError={errors && errors.confirm_password ? true : false}
                errors={errors.confirm_password}
              />
            </div>

            <div className="pt-4 w-full">
              <LoadingButton loading={isLoading} variant="contained" className="btn bg-primary w-full" type="submit">
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

export default SignupPage;
