import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const HamburgerButton = ({onClick}) => (
  <Icon.Button
    onPress={onClick}
    name="menu"
    color='black'
    backgroundColor='white'
    underlayColor='white'
    size={32}
  />
)
