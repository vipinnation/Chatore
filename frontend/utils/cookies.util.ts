import CryptoJS from 'crypto-js';
const ENCRYPTION_KEY = 'your-secret-key';

const encryptData = (data: string) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {}
};

// Decrypt data using the same XOR operation
const decryptData = (encryptedData: string) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {}
};

const saveCookies = (key: string, value: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const encryptedValue = encryptData(value);
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000);
      const domain = window.location.hostname;
      document.cookie = `${key}=${encodeURIComponent(
        encryptedValue as any
      )}; expires=${expirationDate.toUTCString()}; path=/; domain=${domain}`;
      resolve(true);
    } catch (error) {
      resolve(true);
    }
  });
};

const getCookie = (key: string) => {
  return new Promise<string | undefined | null>(async (resolve, reject) => {
    try {
      const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
      const cookie = cookies.find((c) => c.startsWith(`${key}=`));
      if (cookie) {
        const encryptedValue = cookie.split('=')[1];
        let decryptedData = decryptData(decodeURIComponent(encryptedValue));
        resolve(decryptedData);
      }
      resolve(null);
    } catch (error) {
      console.log(error);
      resolve(null);
    }
  });
};

const getUnencryptedCookies = (key: string): string | undefined => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const cookie = cookies.find((c) => c.startsWith(`${key}=`));

  if (cookie) {
    const encryptedValue = cookie.split('=')[1];
    return encryptedValue;
  }

  return undefined;
};

const removeCookie = (key: string): void => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const CookieProvider = { removeCookie, getCookie, saveCookies, getUnencryptedCookies, decryptData };
