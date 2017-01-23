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
        <View style={styles.userInfo}>
          <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
          <Text style={styles.controlText}>
            {currentUser.first_name}
          </Text>
        </View>
      )
    }
  }

  renderSessionLinks() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <View>
          <TouchableHighlight onPress={() => this.goToAndClose('rideNew', {})}>
            <Text style={styles.controlText}>Add ride</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.goToAndClose('usersIndex')}>
            <Text style={styles.controlText}>Users</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.goToAndClose('myAccount', {})}>
            <Text style={styles.controlText}>My account</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.goToAndClose('carsIndex', {})}>
            <Text style={styles.controlText}>My cars</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.logout()}>
            <Text style={styles.controlText}>Logout</Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View>
          <TouchableHighlight onPress={() => this.goToAndClose('login', {type: 'reset'})}>
            <Text style={styles.controlText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.goToAndClose('register', {type: 'reset'})}>
            <Text style={styles.controlText}>Register</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderUserInfo()}
        <TouchableHighlight onPress={() => this.goToAndClose('ridesIndex', {type: 'reset'})}>
          <Text style={styles.controlText}>Rides</Text>
        </TouchableHighlight>
        {this.renderSessionLinks()}
      </ScrollView>
    )
  }
}

SideMenu.contextTypes = {
  drawer: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'black',
  },
  controlText: {
    color: 'white',
    fontSize: 13,
    marginTop: 25,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  userInfo: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
})
