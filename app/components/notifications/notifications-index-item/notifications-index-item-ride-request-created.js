import React, { PropTypes } from 'react'
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export const RideRequestCreated = ({ notification }) => {
  return (
    <ListItem
      onPress={() => Actions.rideShow({rideId: notification.ride.id})}
      key={notification.id}
      title={`${notification.sender.full_name} added ride request for your ride`}
      subtitle={`${notification.ride.start_location_address} - ${notification.ride.destination_location_address}`}
    />
  )
}

RideRequestCreated.propTypes = {
  notification: PropTypes.object.isRequired
}
