// utils
import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export const AsyncContent = ({isFetching, error, children}) => {
  if (isFetching) {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    )
  } else if (error) {
    return (
      <View>
        {error}
      </View>
    )
  } else {
    return (
      <View>
        {children}
      </View>
    )
  }
}

AsyncContent.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  children: PropTypes.node,
}
