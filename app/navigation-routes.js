// utils
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { StackNavigator, TabNavigator, TabView, DrawerNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import ModalRoot from './containers/modals/modal-root/modal-root'
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
import { HamburgerButton } from './components/shared/hamburger-button/hamburger-button'

const navigationOptionsWithHamburger = (title) => (
  {
    navigationOptions: {
      header: (navigation, header) => ({
        left: (
          <HamburgerButton
            onClick={() => navigation.navigate('DrawerOpen')}
          />
        ),
        title: title,
      }),
    },
    headerMode: 'float',
  }
)

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
  }
})

export const AuthenticatedRidesStackNavigator = StackNavigator({
  rides: { screen: AuthenticatedRidesTabNavigator },
  rideShow: { screen: RideShow },
  rideEdit: { screen: RideEdit },
  rideNew: { screen: RideNew },
  carShow: { screen: CarShow },
  carNew: { screen: CarNew },
  carEdit: { screen: CarEdit },
  usersIndex: { screen: UsersIndex },
  userShow: { screen: UserShow },
  myNotifications: { screen: NotificationsIndex },
}, navigationOptionsWithHamburger('Rides'))

export const AuthenticatedAccountTabNavigator = TabNavigator({
  myProfile: { screen: CurrentUserShow },
  myCars: { screen: CarsIndex },
  myRidesAsDriver: { screen: RidesIndexAsDriver },
  myRidesAsPassenger: { screen: RidesIndexAsPassenger },
}, {
  initalRouteName: 'Tab1',
  tabBarComponent: TabView.TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    tabStyle: { width: 150 }
  }
})

export const AuthenticatedAccountStackNavigator = StackNavigator({
  accountTabs: { screen: AuthenticatedAccountTabNavigator },
  myProfileEdit: { screen: CurrentUserEdit },
}, navigationOptionsWithHamburger('My Account'))

export const AuthenticatedDrawerNavigator = DrawerNavigator({
  Rides: { screen: AuthenticatedRidesStackNavigator },
  myAccount: { screen: AuthenticatedAccountStackNavigator },
}, {
  contentComponent: AppDrawer
})

// not authenticated
export const NotAuthenticatedRidesTabNavigator = TabNavigator({
  ridesIndex: { screen: RidesIndex },
}, {
  initalRouteName: 'Tab1',
  tabBarComponent: TabView.TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    tabStyle: { width: 150 }
  }
})

export const NotAuthenticatedLoginStackNavigator = StackNavigator({
  login: { screen: Login },
}, navigationOptionsWithHamburger('Login'))

export const NotAuthenticatedRegisterStackNavigator = StackNavigator({
  register: { screen: Register },
}, navigationOptionsWithHamburger('Register'))

export const NotAuthenticatedRidesStackNavigator = StackNavigator({
  ridesTab: { screen: NotAuthenticatedRidesTabNavigator },
  rideNew: { screen: RideNew },
  rideShow: { screen: RideShow },
  userShow: { screen: UserShow },
  carShow: { screen: CarShow },
}, navigationOptionsWithHamburger('Rides'))

export const NotAuthenticatedDrawerNavigator = DrawerNavigator({
  ridesNavigator: { screen: NotAuthenticatedRidesStackNavigator },
  loginNavigator: { screen: NotAuthenticatedLoginStackNavigator },
  registerNavigator: { screen: NotAuthenticatedRegisterStackNavigator },
}, {
  contentComponent: AppDrawer
})

export const Root = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <View style={{flex: 1}}>
        <AuthenticatedDrawerNavigator />
        <ModalRoot />
      </View>
    )
  } else {
    return (
      <View style={{flex: 1}}>
        <NotAuthenticatedDrawerNavigator />
        <ModalRoot />
      </View>
    )
  }
}
