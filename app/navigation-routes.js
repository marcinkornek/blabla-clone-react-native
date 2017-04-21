// utils
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { StackNavigator, TabNavigator, TabView, DrawerNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import ModalRoot from './containers/modals/modal-root/modal-root'
import SettingsEdit from './containers/settings/settings-edit/settings-edit'
import AppDrawer from './containers/shared/app-drawer/app-drawer'
import Register from './containers/current-user/current-user-new/current-user-new'
import CarsIndex from './containers/cars/cars-index/cars-index'
import CarShow from './containers/cars/car-show/car-show'
import CarNew from './containers/cars/car-new/car-new'
import CarEdit from './containers/cars/car-edit/car-edit'
import CurrentUserShow from './containers/current-user/current-user-show/current-user-show'
import CurrentUserEdit from './containers/current-user/current-user-edit/current-user-edit'
import Login from './containers/session/login/login'
import RidesIndex from './containers/rides/rides-index/rides-index'
import RidesIndexAsPassenger from './containers/rides/rides-index-as-passenger/rides-index-as-passenger'
import RidesIndexAsDriver from './containers/rides/rides-index-as-driver/rides-index-as-driver'
import RideShow from './containers/rides/ride-show/ride-show'
import RideNew from './containers/rides/ride-new/ride-new'
import RideEdit from './containers/rides/ride-edit/ride-edit'
import UsersIndex from './containers/users/users-index/users-index'
import UserShow from './containers/users/user-show/user-show'
import NotificationsIndex from './containers/notifications/notifications-index/notifications-index'
import requireAuth from './containers/shared/require-auth/require-auth'
import HamburgerButton from './containers/shared/hamburger-button/hamburger-button'

// authenticated
export const AuthenticatedRidesTabNavigator = TabNavigator({
  ridesIndex: { screen: RidesIndex },
  ridesAsDriver: { screen: RidesIndexAsDriver },
  ridesAsPassenger: { screen: RidesIndexAsPassenger },
}, {
  initalRouteName: 'ridesIndex',
  tabBarComponent: TabView.TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    tabStyle: { width: 150 }
  },
  navigationOptions: ({navigation}) => ({
    headerLeft:
      <HamburgerButton
        onClick={() => navigation.navigate('DrawerOpen')}
      />
  }),
  headerMode: 'float',
})

export const AuthenticatedRidesStackNavigator = StackNavigator({
  ridesTabs: { screen: AuthenticatedRidesTabNavigator },
  rideNew: { screen: RideNew },
  rideShow: { screen: RideShow },
  rideEdit: { screen: RideEdit },
  usersIndex: { screen: UsersIndex },
  userShow: { screen: UserShow },
  myProfile: { screen: CurrentUserShow },
  myProfileEdit: { screen: CurrentUserEdit },
  myCars: { screen: CarsIndex },
  carNew: { screen: CarNew },
  carShow: { screen: CarShow },
  carEdit: { screen: CarEdit },
  myNotifications: { screen: NotificationsIndex },
  settingsIndex: { screen: SettingsEdit },
}, {
  headermode: 'float'
})

export const AuthenticatedDrawerNavigator = DrawerNavigator({
  rides: { screen: AuthenticatedRidesStackNavigator },
}, {
  contentComponent: AppDrawer
})

// not authenticated
export const NotAuthenticatedRidesTabNavigator = TabNavigator({
  ridesIndex: { screen: RidesIndex },
}, {
  initalRouteName: 'ridesIndex',
  tabBarComponent: TabView.TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    tabStyle: { width: 150 }
  },
  navigationOptions: ({navigation}) => ({
    headerLeft:
      <HamburgerButton
        onClick={() => navigation.navigate('DrawerOpen')}
      />
  }),
  headerMode: 'float',
})

export const NotAuthenticatedRidesStackNavigator = StackNavigator({
  ridesTabs: { screen: NotAuthenticatedRidesTabNavigator },
  rideShow: { screen: RideShow },
  userShow: { screen: UserShow },
  carShow: { screen: CarShow },
}, {
  headermode: 'float'
})

export const NotAuthenticatedDrawerNavigator = DrawerNavigator({
  ridesNavigator: { screen: NotAuthenticatedRidesStackNavigator },
}, {
  contentComponent: AppDrawer
})

export const Root = ({ isAuthenticated, playerId }) => {
  if (isAuthenticated) {
    return (
      <View style={{flex: 1}}>
        <AuthenticatedDrawerNavigator />
        <ModalRoot playerId={playerId} />
      </View>
    )
  } else {
    return (
      <View style={{flex: 1}}>
        <NotAuthenticatedDrawerNavigator />
        <ModalRoot playerId={playerId} />
      </View>
    )
  }
}
