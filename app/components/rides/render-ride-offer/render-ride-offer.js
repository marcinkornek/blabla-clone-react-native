// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import pluralize from 'pluralize';
import moment from 'moment';

// components
import RenderRideOfferForm from '../render-ride-offer-form/render-ride-offer-form'

export class RenderRideOffer extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    currentUserId: PropTypes.number,
    handleSubmit: PropTypes.func,
  }

  renderRideFormOrStatus() {
    const { ride, currentUserId, handleSubmit } = this.props;

    console.log(ride.id);
    console.log(ride.requested);

    if (ride.requested) {
      return (
        <View>
          <Text>{ride.user_ride_request.places}</Text>
          <Text>{pluralize('place', ride.user_ride_request.places)}</Text>
          <Text>Requested: {moment(new Date(ride.user_ride_request.created_at)).from(new Date())}</Text>
          {this.renderRideStatusTime()}
        </View>
      )
    } else {
      return (
        <RenderRideOfferForm
          ride={ride}
          currentUserId={currentUserId}
          onSubmit={handleSubmit}
        />
      )
    }
  }

  renderRideStatusTime() {
    const { ride } = this.props

    if (ride.requested && ride.user_ride_request.status != 'pending' ) {
       return(
        <View>
          <Text>
            {ride.user_ride_request.status}:
            {moment(new Date(ride.user_ride_request.created_at)).from(new Date())}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { ride } = this.props;

    return (
      <View>
        <Text>{ride.price} {ride.currency} for person</Text>
        <Text>{ride.free_places_count} / {ride.places} {pluralize('seat', ride.free_places_count)} free</Text>
        {this.renderRideFormOrStatus()}
      </View>
    )
  }
}
