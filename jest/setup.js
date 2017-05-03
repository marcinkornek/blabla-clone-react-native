jest.mock('react-native-fabric', () => ({
  Crashlytics: {
    crash: jest.fn(),
  },
  Answers: {
    logCustom: jest.fn(),
    logContentView: jest.fn(),
  },
}));

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

jest.mock('PushNotificationIOS', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock('react-native-onesignal', () => ({
  Onesignal: jest.fn(),
  addEventListener: jest.fn(),
}));

jest.mock('react-native-facebook-login', () => ({
  FBLoginManager: {
    LoginBehaviors: jest.fn(),
  },
}));
