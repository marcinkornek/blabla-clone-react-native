import React, { PropTypes } from 'react'
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export const RideRequestUpdated = ({ notification }) => {
  return (
    <ListItem
      onPress={() => Actions.rideShow({rideId: notification.ride.id})}
      key={notification.id}
      title={`${notification.sender.full_name} ${notification.notification_type == 'ride_request_accepted' ? ' accepted' : ' rejected'} your ride request in ride`}
      subtitle={`${notification.ride.start_location_address} - ${notification.ride.destination_location_address}`}
    />
  )
}

RideRequestUpdated.propTypes = {
  notification: PropTypes.object.isRequired
}
