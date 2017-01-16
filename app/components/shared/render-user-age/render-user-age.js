// utils
import React from 'react'
import { Text } from 'react-native';

export const RenderUserAge = props => {
  if (props.user.age) {
    return(<Text>{props.user.age} years</Text>)
  } else {
    return(null)
  }
}
