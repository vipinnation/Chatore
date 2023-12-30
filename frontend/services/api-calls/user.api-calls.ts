import API from '@/constants/api';
import { getErrorMessage } from '@/utils/axios.error';
import { AxiosError } from 'axios';
import AxiosInstance from './axios.instance';

const searchUser = (query: string) => {
  return new Promise<Array<any>>(async (resolve, reject) => {
    try {
      let data: any = await AxiosInstance.get(API.users.search, { params: { search: query } });
      resolve(data);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

export const UserAPI = { searchUser };
