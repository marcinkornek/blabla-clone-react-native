// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// form validators
import LoginValidator from '../login-validator/login-validator'

// inputs
import { TextField } from '../../inputs/text-field/text-field';

const styles = (layout) => StyleSheet.create({
  loginError: {
    marginLeft: 15,
    marginBottom: 5,
    color: stylesColors[layout].error,
  },
  loginButton: {
    backgroundColor: stylesColors[layout].loginEmailButtonBg,
    borderRadius: 0,
    padding: 15,
    margin: 15,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: stylesColors[layout].loginEmailButtonText,
    fontSize: 16,
  }
});

export class LoginEmail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    layout: PropTypes.string.isRequired,
  }

  state = {
    showLoginForm: false,
  }

  renderEmailFormButton() {
    const { showLoginForm } = this.state
    const { layout } = this.props

    if (!showLoginForm) {
      return (
        <Icon.Button
          onPress={this.showFormOnClick.bind(this)}
          name="envelope-o"
          style={styles(layout).loginButton}
          backgroundColor='transparent'
          underlayColor='transparent'
        >
          <Text style={styles(layout).loginButtonText}>
            Login with email and password
          </Text>
        </Icon.Button>
      )
    }
  }

  showErrors() {
    const { errors, layout } = this.props

    if (typeof errors !== 'undefined' && errors.length > 0) {
      return(
        <Text style={styles(layout).loginError}>
          {errors}
        </Text>
      )
    }
  }

  renderLoginForm() {
    const { handleSubmit, isFetching, isOauth, layout } = this.props;
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
            layout={layout}
          />
          <Field
            name="password"
            label="Password"
            secureTextEntry={true}
            component={TextField}
            layout={layout}
          />
          <Button
            raised
            title={isFetching && !isOauth ? 'Logging in' : 'Login'}
            loading={isFetching && !isOauth}
            backgroundColor={stylesColors[layout].buttonSubmit}
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
