import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
});

export const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <View>
    <TextInput
      style={styles.inputStyle}
      placeholder={label}
      onChangeText={(value) => input.onChange(value)}
      {...input}
      {...custom}
    />
    <Text style={styles.error}>{touched && error}</Text>
  </View>
);
