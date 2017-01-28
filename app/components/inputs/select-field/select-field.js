import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: -5
  },
  inputStyle: {
    height: 40,
    marginLeft: 8,
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
});

export const SelectField = ({ input, children, meta: { touched, error }, ...custom }) => (
  <View>
    <Picker
      style={styles.inputStyle}
      selectedValue={input.value}
      onValueChange={value => input.onChange(value)}
      children={children}
      {...custom}
    />
    <Text style={styles.error}>{touched && error}</Text>
  </View>
);
