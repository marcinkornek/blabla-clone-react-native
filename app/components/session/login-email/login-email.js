// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

// form validators
import LoginValidator from '../login-validator/login-validator'

// inputs
import { TextField } from '../../inputs/text-field/text-field';

const styles = StyleSheet.create({
  loginError: {
    marginLeft: 15,
    marginBottom: 5,
    color: 'red'
  },
  loginButton: {
    backgroundColor: '#23A2E3',
    borderRadius: 0,
    padding: 15,
    margin: 15,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  }
});

export class LoginEmail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    showLoginForm: false,
  }

  renderEmailFormButton() {
    const { showLoginForm } = this.state

    if (!showLoginForm) {
      return (
        <Icon.Button
          onPress={this.showFormOnClick.bind(this)}
          name="envelope-o"
          style={styles.loginButton}
          backgroundColor='transparent'
          underlayColor='transparent'
        >
          <Text style={styles.loginButtonText}>
            Login with email and password
          </Text>
        </Icon.Button>
      )
    }
  }

  showErrors() {
    const { errors } = this.props

    if (typeof errors !== 'undefined' && errors.length > 0) {
      return(
        <Text style={styles.loginError}>
          {errors}
        </Text>
      )
    }
  }

  renderLoginForm() {
    const { handleSubmit, isFetching, isOauth } = this.props;
    const { showLoginForm } = this.state

    if (showLoginForm) {
      return(
        <View>
          {this.showErrors()}
          <Field
            name="email"
            label="Email"
            keyboardType="email-address"
            component={TextField}
          />
          <Field
            name="password"
            label="Password"
            secureTextEntry={true}
            component={TextField}
          />
          <Button
            raised
            title={isFetching && !isOauth ? 'Logging in' : 'Login'}
            loading={isFetching && !isOauth}
            backgroundColor='#23A2E3'
            onPress={handleSubmit}
          />
        </View>
      )
    }
  }

  showFormOnClick() {
    const { showLoginForm } = this.state

    if (showLoginForm === false) {
      this.setState({showLoginForm: true})
    } else {
      this.setState({showLoginForm: false})
    }
  }

  render() {
    return (
      <View>
        {this.renderEmailFormButton()}
        {this.renderLoginForm()}
      </View>
    )
  }
}

export default reduxForm({
  form: 'LoginEmail',
  validate: LoginValidator
})(LoginEmail)
