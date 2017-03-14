// utils
import React, { PropTypes } from 'react'
import { ListItem } from 'react-native-elements';

export const RideRequestUpdated = ({ notification, navigation }) => {
  return (
    <ListItem
      onPress={() => navigation.navigate('rideShow', {id: notification.ride.id})}
      key={notification.id}
      title={`${notification.sender.full_name} ${notification.notification_type == 'ride_request_accepted' ? ' accepted' : ' rejected'} your ride request in ride`}
      subtitle={`${notification.ride.start_location_address} - ${notification.ride.destination_location_address}`}
    />
  )
}

RideRequestUpdated.propTypes = {
  notification: PropTypes.object.isRequired
}
