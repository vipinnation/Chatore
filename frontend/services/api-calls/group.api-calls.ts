import API from '@/constants/api';
import { getErrorMessage } from '@/utils/axios.error';
import { AxiosError } from 'axios';
import AxiosInstance from './axios.instance';

const createGroup = (name: string, members: Array<string>) => {
  return new Promise<{ msg: string; group: any }>(async (resolve, reject) => {
    try {
      let res: any = await AxiosInstance.post(API.group.createGroup, { name, members });
      resolve(res);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

export const GroupAPI = { createGroup };
