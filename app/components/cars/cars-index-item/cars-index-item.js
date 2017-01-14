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
    currentUserId: PropTypes.number,
  }

  onPress() {
    const { car } = this.props;

    return (
      Actions.carShow({
        carId: car.id,
        title: `${car.full_name} ${car.production_year}`,
        rightTitle: this.renderRightTitle(),
        onRight: () => this.renderRightAction()
      })
    )
  }

  renderRightTitle() {
    const { car, currentUserId } = this.props;

    if (car.owner_id === currentUserId) return "Edit"
  }

  renderRightAction() {
    const { car, currentUserId } = this.props;

    if (car.owner_id === currentUserId) return Actions.carEdit({carId: car.id})
  }

  render() {
    const { car } = this.props;

    return (
      <ListItem
        onPress={this.onPress.bind(this)}
        key={car.id}
        title={`${car.full_name} ${car.production_year}`}
        subtitle={car.places_full}
        avatar={{uri: car.car_photo}}
      />
    )
  }
}
