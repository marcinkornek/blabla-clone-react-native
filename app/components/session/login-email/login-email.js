// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, View } from 'react-native';
import Button from 'react-native-button';

export class LoginEmail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
  };

  handleSubmit() {
    this.props.handleSubmit(this.state)
  }

  renderLoginForm() {
    return(
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          autoFocus={true}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          onPress={this.handleSubmit.bind(this)}>
          Sign in
        </Button>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderLoginForm()}
      </View>
    )
  }
}
