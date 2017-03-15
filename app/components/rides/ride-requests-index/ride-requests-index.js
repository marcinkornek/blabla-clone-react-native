// utils
import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import pluralize from 'pluralize'

// styles
import stylesColors from '../../../constants/colors';

// components
import { RideRequestsIndexItem } from '../ride-requests-index-item/ride-requests-index-item'

const styles = (layout) => StyleSheet.create({
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
  title: {
    color: stylesColors[layout].primaryText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  view: {
    marginTop: 10,
  },
});

export class RideRequestsIndex extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  renderRideRequestsSummary() {
    const { ride, layout } = this.props

    if (ride.ride_requests_pending_count > 0) {
      return (
        <Text style={styles(layout).primaryText}>
          {`${ride.ride_requests.length} ${pluralize('person', ride.ride_requests.length)} `}
          {`requested ${ride.requested_places_count} of ${ride.free_places_count} available `}
          {pluralize('place', ride.requested_places_count)}
        </Text>
      )
    } else {
      return (
        <Text style={styles(layout).primaryText}>
          No pending ride requests
        </Text>
      )
    }
  }

  renderRideRequestsList() {
    const { ride, layout, handleSubmit } = this.props

    return(
      ride.ride_requests.map((rideRequest, i) =>
        <RideRequestsIndexItem
          key={rideRequest.id}
          rideRequest={rideRequest}
          layout={layout}
          handleOnClick={handleSubmit}
        />
      )
    )
  }

  render() {
    const { layout } = this.props

    return (
      <View style={styles(layout).view}>
        <Text style={styles(layout).title}>Requests</Text>
        <View style={styles(layout).container}>
          {this.renderRideRequestsSummary()}
          {this.renderRideRequestsList()}
        </View>
      </View>
    )
  }
}
