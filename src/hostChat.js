// const HOST_CHAT = 'https://site-news-chat.herokuapp.com/'
// const HOST_CHAT = 'http://localhost:4001';

const HOST_CHAT = process.env.HOST_CHAT || 'http://localhost:4002';

export default HOST_CHAT;