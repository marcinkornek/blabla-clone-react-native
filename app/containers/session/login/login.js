// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

// constants
import { APIEndpoints } from '../../../constants/constants';

// actions
import { logInEmailBackend, logInFacebookBackend, loginClearErrors } from '../../../actions/session';
import { fetchCurrentUser } from '../../../actions/current-user';
import { showModal, hideModal } from '../../../actions/modals';

// components
import LoginEmail from '../../../components/session/login-email/login-email';
import { LoginFacebook } from '../../../components/session/login-facebook/login-facebook';

const styles = (layout) => StyleSheet.create({
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerLink: {
    color: stylesColors[layout].primaryText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: stylesColors[layout].primaryText,
    marginRight: 5,
    fontSize: 16,
  },
  view: {
  }
});

class Login extends Component {
  static propTypes = {
    errors: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    layout: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.props.loginClearErrors()
  }

  handleEmailLogin(data) {
    const { logInEmailBackend, fetchCurrentUser, hideModal, playerId } = this.props;

    logInEmailBackend(data, playerId)
      .then((response) => {
        if (!response.error) {
          let data = response.payload.data
          fetchCurrentUser()
          AsyncStorage.setItem('session',
            JSON.stringify({ email: data.email, access_token: data.access_token, player_id: playerId }))
          hideModal()
        }
      })
  };

  handleFacebookLogin(data) {
    const { logInFacebookBackend, fetchCurrentUser, hideModal, playerId } = this.props

    logInFacebookBackend(data, playerId)
      .then((response) => {
        if (!response.error) {
          let data = response.payload.data
          fetchCurrentUser()
          AsyncStorage.setItem('session',
            JSON.stringify({ email: data.email, access_token: data.access_token, player_id: playerId }))
          hideModal()
        }
      })
  }

  render() {
    const { errors, isFetching, isOauth, showModal, layout } = this.props

    return (
      <View style={styles(layout).view}>
        <LoginEmail
          isOauth={isOauth}
          isFetching={isFetching}
          layout={layout}
          errors={errors}
          onSubmit={this.handleEmailLogin.bind(this)}
        />
        <LoginFacebook
          isOauth={isOauth}
          isFetching={isFetching}
          layout={layout}
          handleSubmit={this.handleFacebookLogin.bind(this)}
        />
        <View style={styles(layout).registerContainer}>
          <Text style={styles(layout).registerText}>Don't have an account?</Text>
          <TouchableHighlight
            underlayColor={stylesColors[layout].primaryBg}
            onPress={() => showModal('REGISTER', { title: 'Create account' })}
          >
            <Text style={styles(layout).registerLink}>Register</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.session.errors,
    isFetching: state.session.isFetching,
    isAuthenticated: state.session.isAuthenticated,
    isOauth: state.session.isOauth,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  logInEmailBackend,
  logInFacebookBackend,
  loginClearErrors,
  fetchCurrentUser,
  showModal,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
