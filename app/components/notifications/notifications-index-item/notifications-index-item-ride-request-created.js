// utils
import React, { PropTypes } from 'react'
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

// colors
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  notificationContainer: {
    backgroundColor: stylesColors[layout].primaryBg,
    borderBottomColor: stylesColors[layout].primaryBorder,
    borderBottomWidth: 2,
  },
  notificationTitle: {
    color: stylesColors[layout].primaryText,
  },
  notificationSubtitle: {
    color: stylesColors[layout].secondaryText,
  },
});

export const RideRequestCreated = ({ notification, layout, navigation }) => {
  return (
    <ListItem
      onPress={() => navigation.navigate('rideShow', {ride: notification.ride, layout: layout})}
      key={notification.id}
      title={`${notification.sender.full_name} added ride request for your ride`}
      subtitle={`${notification.ride.start_location_address} - ${notification.ride.destination_location_address}`}
      underlayColor={stylesColors[layout].secondaryBg}
      containerStyle={styles(layout).notificationContainer}
      titleStyle={styles(layout).notificationTitle}
      subtitleStyle={styles(layout).notificationSubtitle}
    />
  )
}

RideRequestCreated.propTypes = {
  notification: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
}
