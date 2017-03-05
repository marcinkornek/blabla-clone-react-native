// utils
import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import pluralize from 'pluralize'

// components
import { RideRequestsIndexItem } from '../ride-requests-index-item/ride-requests-index-item'

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export class RideRequestsIndex extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
  }

  renderRideRequestsList() {
    const { ride, handleSubmit } = this.props

    return(
      ride.ride_requests.map((rideRequest, i) =>
        <RideRequestsIndexItem
          key={rideRequest.id}
          rideRequest={rideRequest}
          handleOnClick={handleSubmit}
        />
      )
    )
  }

  render() {
    const { ride } = this.props

    return (
      <View style={styles.view}>
        <Text style={styles.title}>Requests</Text>
        <View style={styles.container}>
          <Text>
            {ride.ride_requests.length} {pluralize('person', ride.ride_requests.length)} requested {ride.requested_places_count} of {ride.free_places_count} available {pluralize('place', ride.requested_places_count)}
          </Text>
          {this.renderRideRequestsList()}
        </View>
      </View>
    )
  }
}
