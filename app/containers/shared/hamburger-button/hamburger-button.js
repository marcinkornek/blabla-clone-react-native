// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// styles
import stylesColors from '../../../constants/colors';

export class HamburgerButton extends Component {
  render() {
    const { onClick, layout } = this.props;

    return (
      <Icon.Button
        onPress={onClick}
        name="menu"
        color={stylesColors[layout].hamburgerButtonText}
        backgroundColor={stylesColors[layout].hamburgerButtonBg}
        underlayColor={stylesColors[layout].hamburgerButtonBg}
        size={32}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerButton)
