// utils
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
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

export const AuthenticatedRidesTabNavigator = TabNavigator({
  rides: { screen: RidesIndex },
  ridesAsDriver: { screen: requireAuth(RidesIndexAsDriver) },
  ridesAsPassenger: { screen: requireAuth(RidesIndexAsPassenger) },
})

export const AuthenticatedRidesStackNavigator = StackNavigator({
  ridesTabs: { screen: AuthenticatedRidesTabNavigator },
  rideShow: { screen: RideShow },
  rideEdit: { screen: requireAuth(RideEdit) },
  rideNew: { screen: requireAuth(RideNew) },
  carShow: { screen: CarShow },
  carNew: { screen: requireAuth(CarNew) },
  carEdit: { screen: requireAuth(CarEdit) },
  usersIndex: { screen: UsersIndex },
  userShow: { screen: UserShow },
  myNotifications: { screen: NotificationsIndex },
})

export const AuthenticatedAccountTabNavigator = TabNavigator({
  myProfile: { screen: requireAuth(CurrentUserShow) },
  myCars: { screen: requireAuth(CarsIndex) },
  myRidesAsDriver: { screen: requireAuth(RidesIndexAsDriver) },
  myRidesAsPassenger: { screen: requireAuth(RidesIndexAsPassenger) },
})

export const AuthenticatedAccountStackNavigator = StackNavigator({
  accountTabs: { screen: AuthenticatedAccountTabNavigator }
})

export const AuthenticatedDrawerNavigator = DrawerNavigator({
  Rides: { screen: AuthenticatedRidesStackNavigator },
  myAccount: { screen: AuthenticatedAccountStackNavigator },
}, {
  contentComponent: AppDrawer
})

// not authenticated
export const NotAuthenticatedRidesTabNavigator = TabNavigator({
  rides: { screen: RidesIndex },
})

export const NotAuthenticatedSessionStackNavigator = StackNavigator({
  rides: { screen: NotAuthenticatedRidesTabNavigator },
  login: { screen: Login },
  register: { screen: Register },
})

export const NotAuthenticatedRidesStackNavigator = StackNavigator({
  rides: { screen: NotAuthenticatedRidesTabNavigator },
  rideNew: { screen: requireAuth(RideNew) },
  rideShow: { screen: RideShow },
  userShow: { screen: UserShow },
  carShow: { screen: CarShow },
})

export const NotAuthenticatedDrawerNavigator = DrawerNavigator({
  Rides: { screen: NotAuthenticatedRidesStackNavigator },
  Login: { screen: NotAuthenticatedSessionStackNavigator },
}, {
  contentComponent: AppDrawer
})

export const Root = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <AuthenticatedDrawerNavigator />
  } else {
    return <NotAuthenticatedDrawerNavigator />
  }
}
