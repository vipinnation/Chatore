import { getCookie } from "cookies-next";

const getClientHeaders = {
  "Content-Type": "application/json",
  Authorization: `Token ${getCookie("auth-token")}`,
};

export { getClientHeaders };
