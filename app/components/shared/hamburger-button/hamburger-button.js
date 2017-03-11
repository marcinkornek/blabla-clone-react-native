// utils
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

// styles
import stylesColors from '../../../constants/colors';

export const HamburgerButton = ({onClick}) => (
  <Icon.Button
    onPress={onClick}
    name="menu"
    color={stylesColors.hamburgerButtonText}
    backgroundColor={stylesColors.hamburgerButtonBg}
    underlayColor={stylesColors.hamburgerButtonBg}
    size={32}
  />
)
