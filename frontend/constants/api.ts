const API = {
  auth: {
    signup: '/auth/signup',
    login: '/auth/login'
  },
  chats: {
    fetchChats: '/chats/fetch-chats',
    personalChat: '/chats/personal-chats'
  },
  users: {
    search: '/users/search'
  },
  message: {
    saveMessage: '/message'
  },
  group: {
    createGroup: '/group'
  }
};

export default API;
