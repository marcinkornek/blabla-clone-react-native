import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 10,
    fontSize: 18,
  }
})

export const EditButton = ({onClick, showEdit}) => {
  if (showEdit) {
    return (
      <TouchableHighlight
        onPress={onClick}
        underlayColor={stylesColors.primaryBg}
      >
        <Text style={styles.buttonStyle}>Edit</Text>
      </TouchableHighlight>
    )
  } else {
    return null
  }
}
