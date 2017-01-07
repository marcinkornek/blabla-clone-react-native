var APIRoot = 'https://blabla-clone-api.herokuapp.com/api/'

module.exports = {
  APIRoot: APIRoot,
  APIEndpoints: {
    RIDES: APIRoot + 'rides',
    LOGIN_EMAIL: APIRoot + 'sessions/login',
    USERS: APIRoot + 'users',
    LOGIN_FB: APIRoot + 'sessions/oath_login',
  },
};
