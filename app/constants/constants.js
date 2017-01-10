var APIRoot = 'https://blabla-clone-api.herokuapp.com/api/'

module.exports = {
  APIRoot: APIRoot,
  APIEndpoints: {
    LOGIN_EMAIL: APIRoot + 'sessions/login',
    LOGIN_FB: APIRoot + 'sessions/oath_login',
    RIDES: APIRoot + 'rides',
    SESSIONS: APIRoot + 'sessions',
    USERS: APIRoot + 'users',
  },
};
