// utils
import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  error: {
    color: stylesColors[layout].error,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  label: {
    marginLeft: 15,
    color: stylesColors[layout].primaryText,
  },
  input: {
    height: 40,
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export const ToggleLayoutField = ({ input, label, meta: { touched, error }, layout, ...custom }) => {
  return (
  <View>
    <View style={styles(layout).container}>
      <Text style={styles(layout).label}>{label}</Text>
      <Switch
        style={styles(layout).input}
        value={input.value === 'dark' ? true : false}
        onValueChange={(value) => { input.onChange(value ? 'dark' : 'base') }}
        {...custom}
      />
    </View>
    <Text style={styles(layout).error}>{touched && error}</Text>
  </View>
  )
};
