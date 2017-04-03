import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  buttonStyle: {
    marginRight: 10,
    fontSize: 18,
  }
})

export const EditButton = ({ layout, onClick, showEdit }) => {
  if (showEdit) {
    return (
      <TouchableHighlight
        onPress={onClick}
        underlayColor='transparent'
      >
        <Text style={styles(layout).buttonStyle}>Edit</Text>
      </TouchableHighlight>
    )
  } else {
    return null
  }
}
