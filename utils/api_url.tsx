let base_url = "http://localhost:5000/api/v1";

const login = `${base_url}/auth/login`;
const signup = `${base_url}/auth/signup`;
const forgotPassword = `${base_url}/auth/forgot-password`;
const chat = { chat: "/chat" };

export { base_url, forgotPassword, login, signup, chat };
