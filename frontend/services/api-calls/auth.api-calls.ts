import API from '@/constants/api';
import { getErrorMessage } from '@/utils/axios.error';
import { AxiosError } from 'axios';
import AxiosInstance from './axios.instance';

const login = (body: { email: string; password: string }) => {
  return new Promise<{ msg: string; token: string }>(async (resolve, reject) => {
    try {
      let res: any = await AxiosInstance.post(API.auth.login, body);
      resolve(res);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

const registration = (body: any) => {
  return new Promise<{ msg: string; user: any }>(async (resolve, reject) => {
    try {
      let res: any = await AxiosInstance.post(API.auth.signup, body);
      resolve(res);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

export const AuthAPI = { login, registration };
