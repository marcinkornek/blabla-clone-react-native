// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, View } from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import Button from 'react-native-button';

export class RenderFacebookButton extends Component {
  render() {
    return (
      <Button>
        Sign in with Facebook
      </Button>
    )
  }
}

export class LoginFacebook extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props;

    var _this = this;
    return (
      <FBLogin style={ { flex: null } }
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          handleSubmit(data)
        }}
        onLogout={function(){
          console.log("Logged out.");
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          _this.setState({ user : null });
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function(){
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
        }}
      />
    );
  }
}
