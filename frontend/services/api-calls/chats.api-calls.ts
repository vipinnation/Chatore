import API from '@/constants/api';
import { getErrorMessage } from '@/utils/axios.error';
import { AxiosError } from 'axios';
import AxiosInstance from './axios.instance';

const getActiveConversations = () => {
  return new Promise<Array<any>>(async (resolve, reject) => {
    try {
      let res: any = await AxiosInstance.get(API.chats.fetchChats);
      resolve(res.chat);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

const fetchPersonalChat = (user: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data: any = await AxiosInstance.post(API.chats.personalChat, { user_id: user._id });
      resolve(data.chat);
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      reject(errorMessage);
    }
  });
};

export const ChatAPI = { getActiveConversations, fetchPersonalChat };
