// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export class RenderRidesSearch extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { ride } = this.props;

    return (
      <View style={styles.view}>
        <Text>Search</Text>
      </View>
    )
  }
}
