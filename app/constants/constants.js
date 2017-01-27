var APIRoot = 'https://blabla-clone-api.herokuapp.com/api/'

module.exports = {
  APIRoot: APIRoot,
  APIEndpoints: {
    CARS: APIRoot + 'cars',
    LOGIN_EMAIL: APIRoot + 'sessions/login',
    LOGIN_FB: APIRoot + 'sessions/oath_login',
    NOTIFICATIONS: APIRoot + 'notifications',
    RIDES: APIRoot + 'rides',
    RIDE_REQUESTS: APIRoot + 'ride_requests',
    SESSIONS: APIRoot + 'sessions',
    USERS: APIRoot + 'users',
  },
};
