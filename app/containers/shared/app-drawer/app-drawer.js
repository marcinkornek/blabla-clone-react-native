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

// actions
import { logInFromStorage, logoutCurrentUser } from '../../../actions/session';
import { showModal } from '../../../actions/modals';

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    marginRight: 0,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dropdownLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 17,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  dropdownIcon: {
    paddingTop: 10,
  },
  logoutButton: {
    backgroundColor: '#23A2E3',
    borderRadius: 0,
    paddingTop: 15,
    padding: 10,
  },
  menuLink: {
    fontSize: 17,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  menuSublink: {
    fontSize: 15,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#D3D3D3',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sessionUserIcon: {
    color: 'white',
    marginRight: 5,
  },
  userInfoContainer: {
    backgroundColor: '#23A2E3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoText: {
    width: width - 290,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  userInfoNotificationIcon: {
    paddingTop: 10,
  },
  userInfo: {
    backgroundColor: '#23A2E3',
    height: 100,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  userInfoEmpty: {
    backgroundColor: '#23A2E3',
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
      .then(AsyncStorage.clear())
      .then(navigation.navigate('login'))
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
    const { currentUser } = this.props;

    if (currentUser) {
      return(
        <View style={styles.userInfoContainer}>
          <TouchableHighlight
            underlayColor='#23A2E3'
            onPress={() => this.goToAndClose('myAccount', {})}
          >
            <View style={styles.userInfo}>
              <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
              <View>
                <Text
                  style={styles.userInfoText}
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
            backgroundColor="#23A2E3"
            underlayColor='#23A2E3'
            iconStyle={styles.logoutButton}
            onPress={this.logout.bind(this)}
          />
        </View>
      )
    } else {
      return(
        <View style={styles.userInfoEmpty}>
          <Icon
            name="user"
            backgroundColor="#23A2E3"
            size={22}
            style={styles.sessionUserIcon}
          />
          <TouchableHighlight
            underlayColor='#23A2E3'
            onPress={() => this.openModalAndClose('LOGIN', { title: 'Login' })}
          >
            <Text style={styles.sessionText}>Login</Text>
          </TouchableHighlight>
          <Text style={styles.sessionText}> / </Text>
          <TouchableHighlight
            underlayColor='#23A2E3'
            onPress={() => this.openModalAndClose('REGISTER', { title: 'Create account' })}
          >
            <Text style={styles.sessionText}>Register</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  renderNotificationIcon() {
    return (
      <MaterialIcons.Button
        name="notifications-none"
        backgroundColor="#23A2E3"
        size={25}
        style={styles.userInfoNotificationIcon}
        onPress={() => this.goToAndClose('myNotifications', {})}
      />
    )
  }

  renderSharedLinks() {
    return (
      <TouchableHighlight
        underlayColor='white'
        onPress={() => this.goToAndClose('rides')}
      >
        <Text style={styles.menuLink}>Rides</Text>
      </TouchableHighlight>
    )
  }

  renderAccountLinks() {
    return (
      <View>
        <Collapsible collapsed={this.state.hideAccount}>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('accountTabs', {})}
          >
            <Text style={styles.menuSublink}>My profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('myRidesAsPassenger', {})}
          >
            <Text style={styles.menuSublink}>My rides as passenger</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('myRidesAsDriver', {})}
          >
            <Text style={styles.menuSublink}>My rides as driver</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('myCars', {})}
          >
            <Text style={styles.menuSublink}>My cars</Text>
          </TouchableHighlight>
        </Collapsible>
      </View>
    )
  }

  renderDropdownIcon() {
    if (this.state.hideAccount) {
      return (
        <MaterialIcon
          name='arrow-drop-down'
          style={styles.dropdownIcon}
          backgroundColor='white'
          underlayColor='white'
          size={35}
        />
      )
    } else {
      return (
        <MaterialIcon
          name='arrow-drop-up'
          style={styles.dropdownIcon}
          backgroundColor='white'
          underlayColor='white'
          size={35}
        />
      )
    }
  }

  renderLoggedInAccountLinks() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.toggleAccountLinks()}
          >
            <View style={styles.dropdownLink}>
              <Text style={styles.dropdownText}>My account</Text>
              {this.renderDropdownIcon()}
            </View>
          </TouchableHighlight>
          {this.renderAccountLinks()}
        </View>
      )
    }
  }

  renderLoggedInLinks() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('usersIndex')}
          >
            <Text style={styles.menuLink}>Users</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
  }
}

const mapDispatchToProps = {
  logoutCurrentUser,
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer)
