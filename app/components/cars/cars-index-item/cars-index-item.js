// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  photo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export class CarsIndexItem extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
  }

  render() {
    const { car } = this.props;

    return (
      <View>
        <Image source={{uri: car.car_photo}} style={styles.photo} />
        <Text>{car.full_name}</Text>
        <Text>{car.places_full}</Text>
      </View>
    )
  }
}
