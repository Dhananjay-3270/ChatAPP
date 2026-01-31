export const Apiendpoints = {
    login: '/api/user/login',
    logout: '/api/user/logout',
    register: '/api/user/register',
    getUsers: '/api/message/getuser',
    getHomePageConfig: '/api/homepage/config',
    getStatus: '/api/status/',
    updateStatus: '/api/status/updateStatus',
    getChats: '/api/chat/chats',
    getAllMessages: (chatId: string) => `/api/chat/${chatId}`,
    sendMessage: '/api/message/sendMessage'
}