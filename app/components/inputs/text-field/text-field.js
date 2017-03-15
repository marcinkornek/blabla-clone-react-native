// utils
import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  error: {
    color: stylesColors[layout].error,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  inputStyle: {
    color: stylesColors[layout].primaryText,
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
});

export const TextField = ({ input, label, meta: { touched, error }, layout, ...custom }) => {
  return(
  <View>
    <TextInput
      style={styles(layout).inputStyle}
      placeholderTextColor={stylesColors[layout].primaryText}
      underlineColorAndroid={stylesColors[layout].primaryText}
      placeholder={label}
      onChangeText={(value) => input.onChange(value)}
      {...input}
      {...custom}
    />
    <Text style={styles(layout).error}>{touched && error}</Text>
  </View>
  )
};
