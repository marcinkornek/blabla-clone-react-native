// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

// form validators
import LoginValidator from '../login-validator/login-validator'

// inputs
import { TextField } from '../../inputs/text-field/text-field';

const styles = StyleSheet.create({
  inputStyle: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
  loginError: {
    marginLeft: 15,
    marginBottom: 5,
    color: 'red'
  }
});

export class LoginEmail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    showLoginForm: false,
  }

  renderEmailFormButton() {
    const { showLoginForm } = this.state

    if (!showLoginForm) {
      return (
        <Button
          raised
          title='Login with email and password'
          backgroundColor='#23A2E3'
          onPress={this.showFormOnClick.bind(this)}
        />
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
    const { handleSubmit } = this.props;
    const { showLoginForm } = this.state

    if (showLoginForm) {
      return(
        <View>
          {this.showErrors()}
          <Field
            name="email"
            label="Email"
            keyboardType="email-address"
            style={styles.inputStyle}
            component={TextField}
          />
          <Field
            name="password"
            label="Password"
            secureTextEntry={true}
            style={styles.inputStyle}
            component={TextField}
          />
          <Button
            raised
            title='Login'
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
