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

export const RideRequestUpdated = ({ notification, layout, navigation }) => {
  return (
    <ListItem
      onPress={() => navigation.navigate('rideShow', {ride: notification.ride, layout: layout})}
      key={notification.id}
      title={`${notification.sender.full_name} ${notification.notification_type == 'ride_request_accepted' ? ' accepted' : ' rejected'} your ride request in ride`}
      subtitle={`${notification.ride.start_location_address} - ${notification.ride.destination_location_address}`}
      underlayColor={stylesColors[layout].secondaryBg}
      containerStyle={styles(layout).notificationContainer}
      titleStyle={styles(layout).notificationTitle}
      subtitleStyle={styles(layout).notificationSubtitle}
    />
  )
}

RideRequestUpdated.propTypes = {
  notification: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
}
