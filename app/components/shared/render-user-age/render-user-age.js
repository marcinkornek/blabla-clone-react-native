// utils
import React, { PropTypes } from 'react'
import { Text, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
})

export const RenderUserAge = ({user, layout}) => {
  if (user.age) {
    return(<Text style={styles(layout).primaryText}>{user.age} years</Text>)
  } else {
    return(null)
  }
}

RenderUserAge.propTypes = {
  user: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
}
