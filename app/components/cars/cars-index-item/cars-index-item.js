// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements';

// colors
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  photo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  carContainer: {
    backgroundColor: stylesColors[layout].primaryBg,
    borderBottomColor: stylesColors[layout].primaryBorder,
    borderBottomWidth: 2,
  },
  carTitle: {
    color: stylesColors[layout].primaryText,
  },
  carSubtitle: {
    color: stylesColors[layout].secondaryText,
  },
});

export class CarsIndexItem extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  showCar() {
    const { car, layout, navigation, hideModal } = this.props;

    if (hideModal) hideModal()
    if (navigation) navigation.navigate('carShow', {car: car, layout: layout})
  }

  render() {
    const { car, layout, navigation } = this.props;

    return (
      <ListItem
        onPress={this.showCar.bind(this)}
        key={car.id}
        title={`${car.full_name} ${car.production_year}`}
        subtitle={car.places_full}
        avatar={{uri: car.car_photo}}
        underlayColor={stylesColors[layout].secondaryBg}
        containerStyle={styles(layout).carContainer}
        titleStyle={styles(layout).carTitle}
        subtitleStyle={styles(layout).carSubtitle}
      />
    )
  }
}
