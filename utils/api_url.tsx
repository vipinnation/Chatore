let base_url = "http://localhost:5000/api/v1";

const login = `${base_url}/auth/login`;
const signup = `${base_url}/auth/signup`;
const forgotPassword = `${base_url}/auth/forgot-password`;
const search_user = `${base_url}/user/search`
const chat = { 
    fetchAllChats:`${base_url}/chat/fetch-chats`,
    fetchPersonalChats:`${base_url}/chat/personal-chats`,
    createGroupChat:`${base_url}/chat/create-group`
 };

 const message ={
    send_message:`${base_url}/messages/send-message`
 }
 
export { base_url, forgotPassword, login, signup, chat , search_user , message};
