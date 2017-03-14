// utils
import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (darkLayout) => StyleSheet.create({
  error: {
    color: stylesColors[darkLayout].error,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  label: {
    marginLeft: 15,
    color: stylesColors[darkLayout].primaryText,
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

export const ToggleField = ({ input, label, meta: { touched, error }, darkLayout, ...custom }) => (
  <View>
    <View style={styles(darkLayout).container}>
      <Text style={styles(darkLayout).label}>{label}</Text>
      <Switch
        style={styles(darkLayout).input}
        value={input.value}
        onValueChange={(value) => { input.onChange(value) }}
        {...custom}
      />
    </View>
    <Text style={styles(darkLayout).error}>{touched && error}</Text>
  </View>
);
