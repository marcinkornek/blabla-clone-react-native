// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, View, Text, StyleSheet, Platform } from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// styles
import stylesColors from '../../../constants/colors';

const LoginBehavior = {
  'ios': FBLoginManager.LoginBehaviors.Browser,
  'android': FBLoginManager.LoginBehaviors.Native
}
const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: stylesColors.loginFbButtonBg,
    borderRadius: 0,
    padding: 15,
    margin: 15,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: stylesColors.loginFbButtonText,
    fontSize: 16,
  }
});

export class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
  };

  login() {
    if (!this.context.isLoggedIn){
      this.context.login()
    } else {
      this.context.logout()
    }
  }

  render(){
    const { isFetching, isOauth } = this.props;

    if (isFetching && isOauth) {
      return (
        <Button
          raised
          title='Logging in'
          loading={isFetching}
          fontSize={16}
          buttonStyle={styles.loginButton}
        />
      )
    } else {
      return (
        <Icon.Button
          onPress={() => this.login()}
          name="facebook"
          style={styles.loginButton}
          backgroundColor={stylesColors.transparent}
          underlayColor={stylesColors.transparent}
        >
          <Text style={styles.loginButtonText}>
            Login with Facebook
          </Text>
        </Icon.Button>
      )
    }
  }
}

export class LoginFacebook extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  render() {
    const { handleSubmit, isFetching, isOauth } = this.props;

    return (
      <View>
        <FBLogin
          buttonView={<FBLoginView isFetching={isFetching} isOauth={isOauth} />}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          permissions={["email", "user_friends"]}
          loginBehavior={LoginBehavior[Platform.OS]}
          onLogin={function(data){ handleSubmit(data) }}
          onLogout={function(){ }}
          onLoginFound={function(data){ console.log("Existing login found.") }}
          onLoginNotFound={function(){ console.log("No user logged in.") }}
          onError={function(data){ console.log("ERROR") }}
          onCancel={function(){ console.log("User cancelled.") }}
          onPermissionsMissing={function(data){ console.log("Check permissions!") }}
        />
      </View>
    );
  }
}
