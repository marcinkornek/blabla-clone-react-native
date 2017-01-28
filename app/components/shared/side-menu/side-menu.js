// utils
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { FBLoginManager } from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export class SideMenu extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
  }

  goToAndClose(actionName, options = {}) {
    this.context.drawer.close();
    Actions[actionName](options)
  }

  logout() {
    this.context.drawer.close();
    FBLoginManager.logout((data) => {
      this.props.onLogout()
    })
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
            style={styles.logoutButton}
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
            onPress={() => this.goToAndClose('login', {type: 'reset'})}
          >
            <Text style={styles.sessionText}>Login</Text>
          </TouchableHighlight>
          <Text style={styles.sessionText}> / </Text>
          <TouchableHighlight
            underlayColor='#23A2E3'
            onPress={() => this.goToAndClose('register', {type: 'reset'})}
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
        onPress={() => this.goToAndClose('ridesIndex', {type: 'reset'})}
      >
        <Text style={styles.menuLink}>Rides</Text>
      </TouchableHighlight>
    )
  }

  renderSessionLinks() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('rideNew', {})}
          >
            <Text style={styles.menuLink}>Add ride</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('usersIndex')}
          >
            <Text style={styles.menuLink}>Users</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('myAccount', {})}
          >
            <Text style={styles.menuLink}>My account</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('myRidesAsPassenger', {})}
          >
            <Text style={styles.menuLink}>My rides as passenger</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('myRidesAsDriver', {})}
          >
            <Text style={styles.menuLink}>My rides as driver</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='white'
            onPress={() => this.goToAndClose('carsIndex', {})}
          >
            <Text style={styles.menuLink}>My cars</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderUserInfo()}
        {this.renderSharedLinks()}
        {this.renderSessionLinks()}
      </ScrollView>
    )
  }
}

SideMenu.contextTypes = {
  drawer: PropTypes.object
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    marginRight: 0,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: 120,
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
