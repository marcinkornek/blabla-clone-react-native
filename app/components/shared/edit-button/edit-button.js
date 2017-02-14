import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 10,
    fontSize: 18,
  }
})

export const EditButton = ({onClick, showEdit}) => {
  console.log('==================');
  console.log(showEdit);
  if (showEdit) {
    return (
      <TouchableHighlight
        onPress={onClick}
        underlayColor='white'
      >
        <Text style={styles.buttonStyle}>Edit</Text>
      </TouchableHighlight>
    )
  } else {
    return null
  }
}
