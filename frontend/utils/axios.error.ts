import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const responseData = error.response.data as { msg?: string };
    return responseData.msg || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from the server';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'An error occurred';
  }
};
