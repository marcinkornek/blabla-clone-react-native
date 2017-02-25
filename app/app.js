// utils
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { persistStore } from 'redux-persist';
import { AsyncStorage, Text } from 'react-native';
import OneSignal from 'react-native-onesignal';

// components
import RootRouter from './router'
import { RenderActivityIndicator } from './components/shared/render-activity-indicator/render-activity-indicator'

class App extends Component {
  state = {
    rehydrated: false
  }

  componentWillMount(){
    persistStore(store, { storage: AsyncStorage, whitelist: ['session', 'currentUser', 'rides', 'users'] }, () => {
      this.setState({ rehydrated: true })
    })
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    if(!this.state.rehydrated){
      return <RenderActivityIndicator />
    } else {
      return (
        <Provider store={store}>
          <RootRouter />
        </Provider>
      );
    }
  }
}

export default App;
