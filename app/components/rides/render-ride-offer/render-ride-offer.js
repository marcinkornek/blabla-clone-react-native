// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import pluralize from 'pluralize';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// components
import RenderRideOfferForm from '../render-ride-offer-form/render-ride-offer-form'

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
    marginBottom: 10,
  },
});

export class RenderRideOffer extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    handleSubmit: PropTypes.func,
    layout: PropTypes.string.isRequired,
  }

  renderRideFormOrStatus() {
    const { ride, currentUser, layout, handleSubmit } = this.props;

    if (ride.user_ride_request) {
      return (
        <View style={styles(layout).view}>
          <Text style={styles(layout).title}>Booking</Text>
          <Text style={styles(layout).primaryText}>
            {`${ride.user_ride_request.places} ${pluralize('place', ride.user_ride_request.places)}`}
          </Text>
          <Text style={styles(layout).primaryText}>requested: {moment(new Date(ride.user_ride_request.created_at)).fromNow()}</Text>
          {this.renderRideStatusTime()}
        </View>
      )
    } else {
      return (
        <RenderRideOfferForm
          ride={ride}
          currentUser={currentUser}
          layout={layout}
          onSubmit={handleSubmit}
        />
      )
    }
  }

  renderRideStatusTime() {
    const { ride, layout } = this.props

    if (ride.user_ride_request && ride.user_ride_request.status != 'pending' ) {
       return(
        <View>
          <Text style={styles(layout).primaryText}>
            {ride.user_ride_request.status}: {moment(new Date(ride.user_ride_request.updated_at)).fromNow()}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { ride, layout } = this.props;

    return (
      <View style={styles(layout).view}>
        <Text style={styles(layout).title}>Offer</Text>
        <Text style={styles(layout).primaryText}>{ride.price} {ride.currency} for person</Text>
        <Text style={styles(layout).primaryText}>{ride.free_places_count} / {ride.places} {pluralize('seat', ride.free_places_count)} free</Text>
        {this.renderRideFormOrStatus()}
      </View>
    )
  }
}
