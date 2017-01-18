// utils
import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export const RenderActivityIndicator = ({isFetching, error, children}) => (
  <ActivityIndicator
    animating={true}
    style={[styles.centering, {height: 80}]}
    size="large"
  />
);
