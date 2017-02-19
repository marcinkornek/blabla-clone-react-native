// utils
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { persistStore } from 'redux-persist';
import { AsyncStorage, Text } from 'react-native';

// components
// import { Root } from './flux-navigation-root'
import RootRouter from './router'
import { RenderActivityIndicator } from './components/shared/render-activity-indicator/render-activity-indicator'

class App extends Component {
  state = {
    rehydrated: false
  }

   componentWillMount(){
      persistStore(store, { storage: AsyncStorage, whitelist: ['session', 'currentUser'] }, () => {
       this.setState({ rehydrated: true })
     })
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
