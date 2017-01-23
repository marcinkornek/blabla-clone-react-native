// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import pluralize from 'pluralize';
import moment from 'moment';

// components
import RenderRideOfferForm from '../render-ride-offer-form/render-ride-offer-form'

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export class RenderRideOffer extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    currentUserId: PropTypes.number,
    handleSubmit: PropTypes.func,
  }

  renderRideFormOrStatus() {
    const { ride, currentUserId, handleSubmit } = this.props;

    if (ride.requested) {
      return (
        <View style={styles.view}>
          <Text style={styles.title}>Booking</Text>
          <Text>
            {`${ride.user_ride_request.places} ${pluralize('place', ride.user_ride_request.places)}`}
          </Text>
          <Text>requested: {moment(new Date(ride.user_ride_request.created_at)).fromNow()}</Text>
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
            {moment(new Date(ride.user_ride_request.updated_at)).fromNow()}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { ride } = this.props;

    return (
      <View style={styles.view}>
        <Text style={styles.title}>Offer</Text>
        <Text>{ride.price} {ride.currency} for person</Text>
        <Text>{ride.free_places_count} / {ride.places} {pluralize('seat', ride.free_places_count)} free</Text>
        {this.renderRideFormOrStatus()}
      </View>
    )
  }
}
