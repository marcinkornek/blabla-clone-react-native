// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
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
  }

  render() {
    const { car } = this.props;

    return (
      <ListItem
        onPress={() => Actions.carShow({carId: car.id})}
        key={car.id}
        title={`${car.full_name} ${car.production_year}`}
        subtitle={car.places_full}
        avatar={{uri: car.car_photo}}
      />
    )
  }
}
