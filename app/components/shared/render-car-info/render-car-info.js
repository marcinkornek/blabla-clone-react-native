// utils
import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  view: {
    marginTop: 10,
  },
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  car: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

export const RenderCarInfo = ({car, navigation}) => (
  <View style={styles.view}>
    <Text style={styles.title}>Car</Text>
    <View style={styles.container}>
      <Image source={{uri: car.car_photo}} style={styles.avatar} />
      <View>
        <Text>{car.full_name}</Text>
        <Text>{car.production_year}</Text>
      </View>
    </View>
    <TouchableHighlight
      underlayColor='white'
      onPress={() => navigation.navigate('carShow', { id: car.id })}
    >
      <Text>view car</Text>
    </TouchableHighlight>
  </View>
)

RenderCarInfo.propTypes = {
  car: PropTypes.object.isRequired,
}
