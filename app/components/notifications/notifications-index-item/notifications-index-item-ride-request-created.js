// utils
import React, { PropTypes } from 'react'
import { ListItem } from 'react-native-elements';

export const RideRequestCreated = ({ notification, layout, navigation }) => {
  return (
    <ListItem
      onPress={() => navigation.navigate('rideShow', {id: notification.ride.id})}
      key={notification.id}
      title={`${notification.sender.full_name} added ride request for your ride`}
      subtitle={`${notification.ride.start_location_address} - ${notification.ride.destination_location_address}`}
    />
  )
}

RideRequestCreated.propTypes = {
  notification: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
}
