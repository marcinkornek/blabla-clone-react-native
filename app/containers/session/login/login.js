// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

// constants
import { APIEndpoints } from '../../../constants/constants';

// actions
import { logInEmailBackend, logInFacebookBackend } from '../../../actions/session';
import { fetchCurrentUser } from '../../../actions/current-user';

// components
import { LoginEmail } from '../../../components/session/login-email/login-email';
import { LoginFacebook } from '../../../components/session/login-facebook/login-facebook';

class Login extends Component {
  static propTypes = {
    errors: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  handleEmailLogin(data) {
    const { logInEmailBackend, fetchCurrentUser } = this.props;

    logInEmailBackend(data)
      .then((response) => {
        if (!response.error) {
          let data = response.payload.data
          fetchCurrentUser()
          AsyncStorage.setItem('session',
            JSON.stringify({ 'email': data.email, 'access_token': data.access_token }))
          Actions.ridesIndex({type: 'reset'})
        }
      })
  };

  handleFacebookLogin(data) {
    const { logInFacebookBackend, fetchCurrentUser } = this.props

    logInFacebookBackend(data)
      .then((response) => {
        if (!response.error) {
          let data = response.payload.data
          fetchCurrentUser()
          AsyncStorage.setItem('session',
            JSON.stringify({ 'email': data.email, 'access_token': data.access_token }))
          Actions.ridesIndex({type: 'reset'})
        }
      })
  }

  showErrors() {
    const { errors } = this.props

    if (typeof errors !== 'undefined' && errors.length > 0) {
      return(
        <Text>
          {errors}
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.view}>
        {this.showErrors()}
        <LoginEmail
          handleSubmit={this.handleEmailLogin.bind(this)}
        />
        <LoginFacebook
          handleSubmit={this.handleFacebookLogin.bind(this)}
        />
        <Button
          raised
          title='Register'
          onPress={Actions.register}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 80,
  }
});

const mapStateToProps = (state) => {
  return {
    errors: state.session.errors,
    isFetching: state.session.isFetching,
    isAuthenticated: state.session.isAuthenticated,
  }
}

const mapDispatchToProps = {
  logInEmailBackend,
  logInFacebookBackend,
  fetchCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
