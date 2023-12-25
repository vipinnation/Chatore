import API from "@/constants/api";
import AxiosInstance from "./axios.instance";

const login = () => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {}
  });
};

const registration = (body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await AxiosInstance.post(API.auth.signup, body);
      resolve(res.data);
    } catch (error) {
      console.log(error);
    }
  });
};

export const AuthAPI = { login, registration };
