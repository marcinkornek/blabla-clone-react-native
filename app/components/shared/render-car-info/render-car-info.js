// utils
import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export const RenderCarInfo = ({car}) => (
  <View>
    <Image source={{uri: car.car_photo}} style={styles.avatar} />
    <Text>{car.full_name}</Text>
    <Text>{car.production_year}</Text>
    <TouchableHighlight onPress={() => Actions.carShow({carId: car.id})}>
      <Text>view car</Text>
    </TouchableHighlight>
  </View>
)

RenderCarInfo.propTypes = {
  car: PropTypes.object.isRequired,
}
