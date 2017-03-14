// utils
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux';
import { FBLoginManager } from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';
import { store } from '../../../store/store';
import { persistStore } from 'redux-persist';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { logoutCurrentUser } from '../../../actions/session';
import { showModal } from '../../../actions/modals';

const { width, height } = Dimensions.get('window')
const styles = (darkLayout) => StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    marginRight: 0,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: stylesColors[darkLayout].appDrawerAvatarBorder,
  },
  container: {
    flex: 1,
    backgroundColor: stylesColors[darkLayout].appDrawerBg,
  },
  dropdownLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: stylesColors[darkLayout].appDrawerDivider,
    borderBottomWidth: 1,
  },
  dropdownText: {
    color: stylesColors[darkLayout].appDrawerText,
    fontSize: 17,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  dropdownIcon: {
    color: stylesColors[darkLayout].appDrawerText,
    paddingTop: 10,
  },
  logoutButton: {
    backgroundColor: stylesColors[darkLayout].appDrawerUserContainerBg,
    borderRadius: 0,
    paddingTop: 15,
    padding: 10,
  },
  menuLink: {
    fontSize: 17,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    color: stylesColors[darkLayout].appDrawerText,
    borderColor: stylesColors[darkLayout].appDrawerDivider,
    borderBottomWidth: 1,
  },
  menuSublink: {
    fontSize: 15,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    color: stylesColors[darkLayout].appDrawerText,
    borderColor: stylesColors[darkLayout].appDrawerDivider,
    backgroundColor: stylesColors[darkLayout].appDrawerDropdownBg,
    borderBottomWidth: 1,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: stylesColors[darkLayout].userInfoContainerText,
  },
  sessionUserIcon: {
    color: stylesColors[darkLayout].userInfoContainerText,
    marginRight: 5,
  },
  userInfoContainer: {
    backgroundColor: stylesColors[darkLayout].appDrawerUserContainerBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoText: {
    width: width - 290,
    fontSize: 18,
    fontWeight: 'bold',
    color: stylesColors[darkLayout].userInfoContainerText,
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  userInfoNotificationIcon: {
    paddingTop: 10,
  },
  userInfo: {
    backgroundColor: stylesColors[darkLayout].appDrawerUserContainerBg,
    height: 100,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  userInfoEmpty: {
    backgroundColor: stylesColors[darkLayout].appDrawerUserContainerBg,
    height: 80,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
})

export class AppDrawer extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  state = {
    hideAccount: true,
  }

  goToAndClose(actionName, options = {}) {
    const { navigation } = this.props;

    navigation.navigate(actionName, options)
  }

  openModalAndClose(modalType, modalProps) {
    const { navigation, showModal } = this.props;

    showModal(modalType, modalProps)
    navigation.navigate('DrawerClose')
  }

  onLogout() {
    const { logoutCurrentUser, currentUser, navigation } = this.props

    logoutCurrentUser(currentUser)
      .then((response) => {
        // persistStore(store, {
        //   storage: AsyncStorage
        // }, () => {
        //   console.log('purge succeeded')
        // }).purge([
        //   'session',
        //   'currentUser',
        //   'ridesAsDriver',
        //   'ridesAsPassenger',
        //   'notifications',
        // ])

        // code below commented out because it's causing error "Can't find variable: Reflect"
        // when purging array of keys (purging all items with .purge() works fine)
        // Use code above when it's fixed
        // https://github.com/rt2zz/redux-persist/issues/263
        AsyncStorage.multiRemove([
          'reduxPersist:session',
          'reduxPersist:currentUser',
          'reduxPersist:ridesAsDriver',
          'reduxPersist:ridesAsPassenger',
          'reduxPersist:notifications',
        ])
      })
  }

  logout() {
    FBLoginManager.logout((data) => {
      this.onLogout()
    })
  }

  toggleAccountLinks() {
    this.setState({hideAccount: !this.state.hideAccount})
  }

  renderUserInfo() {
    const { currentUser, darkLayout } = this.props;

    if (currentUser) {
      return(
        <View style={styles(darkLayout).userInfoContainer}>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerUserContainerBg}
            onPress={() => this.goToAndClose('myAccount', {})}
          >
            <View style={styles(darkLayout).userInfo}>
              <Image source={{uri: currentUser.avatar}} style={styles(darkLayout).avatar} />
              <View>
                <Text
                  style={styles(darkLayout).userInfoText}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                >
                  {currentUser.first_name}
                </Text>
                {this.renderNotificationIcon()}
              </View>
            </View>
          </TouchableHighlight>
          <Icon.Button
            name="power-off"
            backgroundColor={stylesColors[darkLayout].appDrawerUserContainerBg}
            underlayColor={stylesColors[darkLayout].appDrawerUserContainerBg}
            iconStyle={styles(darkLayout).logoutButton}
            onPress={this.logout.bind(this)}
          />
        </View>
      )
    } else {
      return(
        <View style={styles(darkLayout).userInfoEmpty}>
          <Icon
            name="user"
            backgroundColor={stylesColors[darkLayout].appDrawerUserContainerBg}
            size={22}
            style={styles(darkLayout).sessionUserIcon}
          />
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerUserContainerBg}
            onPress={() => this.openModalAndClose('LOGIN', { title: 'Login' })}
          >
            <Text style={styles(darkLayout).sessionText}>Login</Text>
          </TouchableHighlight>
          <Text style={styles(darkLayout).sessionText}> / </Text>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerUserContainerBg}
            onPress={() => this.openModalAndClose('REGISTER', { title: 'Create account' })}
          >
            <Text style={styles(darkLayout).sessionText}>Register</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  renderNotificationIcon() {
    const { darkLayout } = this.props;

    return (
      <MaterialIcons.Button
        name="notifications-none"
        backgroundColor={stylesColors[darkLayout].appDrawerUserContainerBg}
        size={25}
        style={styles(darkLayout).userInfoNotificationIcon}
        onPress={() => this.goToAndClose('myNotifications', {})}
      />
    )
  }

  renderSharedLinks() {
    const { darkLayout } = this.props;

    return (
      <TouchableHighlight
        underlayColor={stylesColors[darkLayout].appDrawerBg}
        onPress={() => this.goToAndClose('rides')}
      >
        <Text style={styles(darkLayout).menuLink}>Rides</Text>
      </TouchableHighlight>
    )
  }

  renderAccountLinks() {
    const { darkLayout } = this.props;

    return (
      <View>
        <Collapsible collapsed={this.state.hideAccount}>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.goToAndClose('accountTabs', {})}
          >
            <Text style={styles(darkLayout).menuSublink}>My profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.goToAndClose('myRidesAsPassenger', {})}
          >
            <Text style={styles(darkLayout).menuSublink}>My rides as passenger</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.goToAndClose('myRidesAsDriver', {})}
          >
            <Text style={styles(darkLayout).menuSublink}>My rides as driver</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.goToAndClose('myCars', {})}
          >
            <Text style={styles(darkLayout).menuSublink}>My cars</Text>
          </TouchableHighlight>
        </Collapsible>
      </View>
    )
  }

  renderDropdownIcon() {
    const { darkLayout } = this.props;

    if (this.state.hideAccount) {
      return (
        <MaterialIcon
          name='arrow-drop-down'
          style={styles(darkLayout).dropdownIcon}
          backgroundColor={stylesColors[darkLayout].appDrawerBg}
          underlayColor={stylesColors[darkLayout].appDrawerBg}
          size={35}
        />
      )
    } else {
      return (
        <MaterialIcon
          name='arrow-drop-up'
          style={styles(darkLayout).dropdownIcon}
          backgroundColor={stylesColors[darkLayout].appDrawerBg}
          underlayColor={stylesColors[darkLayout].appDrawerBg}
          size={35}
        />
      )
    }
  }

  renderLoggedInAccountLinks() {
    const { isAuthenticated, darkLayout } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.toggleAccountLinks()}
          >
            <View style={styles(darkLayout).dropdownLink}>
              <Text style={styles(darkLayout).dropdownText}>My account</Text>
              {this.renderDropdownIcon()}
            </View>
          </TouchableHighlight>
          {this.renderAccountLinks()}
        </View>
      )
    }
  }

  renderLoggedInLinks() {
    const { isAuthenticated, darkLayout } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.goToAndClose('usersIndex')}
          >
            <Text style={styles(darkLayout).menuLink}>Users</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={stylesColors[darkLayout].appDrawerBg}
            onPress={() => this.goToAndClose('settingsIndex')}
          >
            <Text style={styles(darkLayout).menuLink}>Settings</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    const { darkLayout } = this.props;

    return (
      <ScrollView style={styles(darkLayout).container}>
        {this.renderUserInfo()}
        {this.renderLoggedInAccountLinks()}
        {this.renderSharedLinks()}
        {this.renderLoggedInLinks()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.item,
    isStarted: state.currentUser.isStarted,
    isFetching: state.currentUser.isFetching,
    isAuthenticated: state.session.isAuthenticated,
    darkLayout: state.settings.darkLayout,
  }
}

const mapDispatchToProps = {
  logoutCurrentUser,
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer)
