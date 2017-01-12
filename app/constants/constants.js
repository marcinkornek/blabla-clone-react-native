var APIRoot = 'https://blabla-clone-api.herokuapp.com/api/'

module.exports = {
  APIRoot: APIRoot,
  APIEndpoints: {
    cars: APIRoot + 'cars',
    LOGIN_EMAIL: APIRoot + 'sessions/login',
    LOGIN_FB: APIRoot + 'sessions/oath_login',
    RIDES: APIRoot + 'rides',
    SESSIONS: APIRoot + 'sessions',
    USERS: APIRoot + 'users',
  },
};
