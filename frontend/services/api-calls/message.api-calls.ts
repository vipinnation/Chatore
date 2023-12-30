import API from '@/constants/api';
import { getErrorMessage } from '@/utils/axios.error';
import { AxiosError } from 'axios';
import AxiosInstance from './axios.instance';

const sendMessage = (_id: string, message: string) => {
  return new Promise<Array<any>>(async (resolve, reject) => {
    try {
      let res: any = await AxiosInstance.post(API.message.saveMessage, {
        content: message,
        chat_id: _id
      });
      resolve(res.chat);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

export const MessageAPI = { sendMessage };
