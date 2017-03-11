// utils
import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = StyleSheet.create({
  error: {
    color: stylesColors.error,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  label: {
    marginLeft: 15,
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

export const ToggleField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <View>
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        style={styles.input}
        value={input.value}
        onValueChange={(value) => { input.onChange(value) }}
        {...custom}
      />
    </View>
    <Text style={styles.error}>{touched && error}</Text>
  </View>
);
