// utils
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { persistStore } from 'redux-persist';
import { AsyncStorage, Text } from 'react-native';
import OneSignal from 'react-native-onesignal';
import crashlytics from 'react-native-fabric-crashlytics';

crashlytics.init();

// actions
import { addActiveNotification } from './actions/notifications';

// components
import RootRouter from './router'
import { RenderActivityIndicator } from './components/shared/render-activity-indicator/render-activity-indicator'

class App extends Component {
  state = {
    rehydrated: false,
  }

  componentWillMount(){
    this.addEventListeners()
    persistStore(store, {
      storage: AsyncStorage, whitelist: [
        'session',
        'currentUser',
        'rides',
        'ridesAsDriver',
        'ridesAsPassenger',
        'ridesFilters',
        'ridesAsDriverFilters',
        'ridesAsPassengerFilters',
        'users',
        'notifications',
        'settings',
      ]
    }, () => {
      this.setState({ rehydrated: true })
    })
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListeners() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds.bind(this));
  }

  removeEventListeners() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds.bind(this));
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    store.dispatch(addActiveNotification(openResult.notification.payload.additionalData))
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device.userId);
    this.playerId = device.userId
  }

  render() {
    if(!this.state.rehydrated){
      return <RenderActivityIndicator />
    } else {
      return (
        <Provider store={store}>
          <RootRouter playerId={this.playerId} />
        </Provider>
      );
    }
  }
}

export default App;
