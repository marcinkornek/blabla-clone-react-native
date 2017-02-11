import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';

export class HamburgerButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <Icon.Button
        onPress={onClick}
        name="menu"
        color='black'
        backgroundColor='white'
        underlayColor='white'
        size={32}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerButton)
