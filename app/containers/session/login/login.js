// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

// constants
import { APIEndpoints } from '../../../constants/constants';

// actions
import { logInEmailBackend } from '../../../actions/session';
import { fetchCurrentUser } from '../../../actions/current-user';

// components
import { LoginEmail } from '../../../components/session/login-email/login-email';

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
          fetchCurrentUser()
          Actions.ridesIndex({type: 'reset'})
        }
      })
  };

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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 100,
    backgroundColor: '#ffff00'
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
  fetchCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
