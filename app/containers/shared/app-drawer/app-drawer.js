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
const styles = (layout) => StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    marginRight: 0,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: stylesColors[layout].appDrawerAvatarBorder,
  },
  container: {
    flex: 1,
    backgroundColor: stylesColors[layout].appDrawerBg,
  },
  dropdownLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: stylesColors[layout].appDrawerDivider,
    borderBottomWidth: 1,
  },
  dropdownText: {
    color: stylesColors[layout].appDrawerText,
    fontSize: 17,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  dropdownIcon: {
    color: stylesColors[layout].appDrawerText,
    paddingTop: 10,
  },
  logoutButton: {
    backgroundColor: stylesColors[layout].appDrawerUserContainerBg,
    borderRadius: 0,
    paddingTop: 15,
    padding: 10,
  },
  menuLink: {
    fontSize: 17,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    color: stylesColors[layout].appDrawerText,
    borderColor: stylesColors[layout].appDrawerDivider,
    borderBottomWidth: 1,
  },
  menuSublink: {
    fontSize: 15,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    color: stylesColors[layout].appDrawerText,
    borderColor: stylesColors[layout].appDrawerDivider,
    backgroundColor: stylesColors[layout].appDrawerDropdownBg,
    borderBottomWidth: 1,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: stylesColors[layout].userInfoContainerText,
  },
  sessionUserIcon: {
    color: stylesColors[layout].userInfoContainerText,
    marginRight: 5,
  },
  userInfoContainer: {
    backgroundColor: stylesColors[layout].appDrawerUserContainerBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoText: {
    width: width - 290,
    fontSize: 18,
    fontWeight: 'bold',
    color: stylesColors[layout].userInfoContainerText,
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  userInfoNotificationIcon: {
    paddingTop: 10,
  },
  userInfo: {
    backgroundColor: stylesColors[layout].appDrawerUserContainerBg,
    height: 100,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  userInfoEmpty: {
    backgroundColor: stylesColors[layout].appDrawerUserContainerBg,
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
    const { currentUser, layout } = this.props;

    if (currentUser) {
      return(
        <View style={styles(layout).userInfoContainer}>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerUserContainerBg}
            onPress={() => this.goToAndClose('myProfile', {})}
          >
            <View style={styles(layout).userInfo}>
              <Image source={{uri: currentUser.avatar}} style={styles(layout).avatar} />
              <View>
                <Text
                  style={styles(layout).userInfoText}
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
            backgroundColor={stylesColors[layout].appDrawerUserContainerBg}
            underlayColor={stylesColors[layout].appDrawerUserContainerBg}
            iconStyle={styles(layout).logoutButton}
            onPress={this.logout.bind(this)}
          />
        </View>
      )
    } else {
      return(
        <View style={styles(layout).userInfoEmpty}>
          <Icon
            name="user"
            backgroundColor={stylesColors[layout].appDrawerUserContainerBg}
            size={22}
            style={styles(layout).sessionUserIcon}
          />
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerUserContainerBg}
            onPress={() => this.openModalAndClose('LOGIN', { title: 'Login' })}
          >
            <Text style={styles(layout).sessionText}>Login</Text>
          </TouchableHighlight>
          <Text style={styles(layout).sessionText}> / </Text>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerUserContainerBg}
            onPress={() => this.openModalAndClose('REGISTER', { title: 'Create account' })}
          >
            <Text style={styles(layout).sessionText}>Register</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  renderNotificationIcon() {
    const { layout } = this.props;

    return (
      <MaterialIcons.Button
        name="notifications-none"
        backgroundColor={stylesColors[layout].appDrawerUserContainerBg}
        size={25}
        style={styles(layout).userInfoNotificationIcon}
        onPress={() => this.goToAndClose('myNotifications', {})}
      />
    )
  }

  renderSharedLinks() {
    const { layout } = this.props;

    return (
      <TouchableHighlight
        underlayColor={stylesColors[layout].appDrawerBg}
        onPress={() => this.goToAndClose('ridesTabs')}
      >
        <Text style={styles(layout).menuLink}>Rides</Text>
      </TouchableHighlight>
    )
  }

  renderAccountLinks() {
    const { layout } = this.props;

    return (
      <View>
        <Collapsible collapsed={this.state.hideAccount}>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerBg}
            onPress={() => this.goToAndClose('myProfile', {})}
          >
            <Text style={styles(layout).menuSublink}>My profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerBg}
            onPress={() => this.goToAndClose('myCars', {})}
          >
            <Text style={styles(layout).menuSublink}>My cars</Text>
          </TouchableHighlight>
        </Collapsible>
      </View>
    )
  }

  renderDropdownIcon() {
    const { layout } = this.props;

    if (this.state.hideAccount) {
      return (
        <MaterialIcon
          name='arrow-drop-down'
          style={styles(layout).dropdownIcon}
          backgroundColor={stylesColors[layout].appDrawerBg}
          underlayColor={stylesColors[layout].appDrawerBg}
          size={35}
        />
      )
    } else {
      return (
        <MaterialIcon
          name='arrow-drop-up'
          style={styles(layout).dropdownIcon}
          backgroundColor={stylesColors[layout].appDrawerBg}
          underlayColor={stylesColors[layout].appDrawerBg}
          size={35}
        />
      )
    }
  }

  renderLoggedInAccountLinks() {
    const { isAuthenticated, layout } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerBg}
            onPress={() => this.toggleAccountLinks()}
          >
            <View style={styles(layout).dropdownLink}>
              <Text style={styles(layout).dropdownText}>My account</Text>
              {this.renderDropdownIcon()}
            </View>
          </TouchableHighlight>
          {this.renderAccountLinks()}
        </View>
      )
    }
  }

  renderLoggedInLinks() {
    const { isAuthenticated, layout } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerBg}
            onPress={() => this.goToAndClose('usersIndex')}
          >
            <Text style={styles(layout).menuLink}>Users</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={stylesColors[layout].appDrawerBg}
            onPress={() => this.goToAndClose('settingsIndex')}
          >
            <Text style={styles(layout).menuLink}>Settings</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    const { layout } = this.props;

    return (
      <ScrollView style={styles(layout).container}>
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
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  logoutCurrentUser,
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer)
