// utils
import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// components
import { RenderCarInfo } from '../../shared/render-car-info/render-car-info'
import { RenderRideMap } from '../../shared/render-ride-map/render-ride-map'
import { RenderRideOffer } from '../render-ride-offer/render-ride-offer'
import { RenderUserProfile } from '../../shared/render-user-profile/render-user-profile'
import { RideRequestsIndex } from '../../rides/ride-requests-index/ride-requests-index'

const styles = (layout) => StyleSheet.create({
  rideDetails: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  rideDestination: {
    color: stylesColors[layout].primaryText,
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export class RideShowPast extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    layout: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  renderRideDetails() {
    const { ride, layout } = this.props

    return (
      <View style={styles(layout).rideDetails}>
        <Text style={styles(layout).rideDestination}>
          {ride.start_location_address} - {ride.destination_location_address}
        </Text>
        <Text>{moment(ride.start_date).format('DD.MM.YY H:MM')}</Text>
      </View>
    )
  }

  renderRideMap() {
    const { ride, layout } = this.props

    return (
      <RenderRideMap
        layout={layout}
        start_location={ride.start_location}
        destination_location={ride.destination_location}
      />
    )
  }

  renderRideDriver() {
    const { ride, currentUser, showUserModal, layout, navigation } = this.props

    if (ride.driver && !(ride.driver.id === currentUser.id)) {
      return(
        <RenderUserProfile
          user={ride.driver}
          onSubmit={showUserModal}
          layout={layout}
          navigation={navigation}
        />
      )
    }
  }

  renderRideCar() {
    const { ride, showCarModal, layout, navigation } = this.props

    if (ride.car) {
      return(
        <RenderCarInfo
          car={ride.car}
          onSubmit={showCarModal}
          layout={layout}
          navigation={navigation}
        />
      )
    }
  }

  renderRideOffer() {
    const { ride, currentUser, createRideRequest, layout } = this.props

    if (ride.driver) {
      return(
        <RenderRideOffer
          ride={ride}
          currentUser={currentUser}
          handleSubmit={createRideRequest}
          layout={layout}
        />
      )
    }
  }

  renderRideRequests() {
    const { ride, currentUser, changeRideRequest, layout } = this.props

    if (ride.driver && (ride.driver.id === currentUser.id) && !_.isEmpty(ride.ride_requests)) {
      return(
        <RideRequestsIndex
          ride={ride}
          currentUser={currentUser}
          handleSubmit={changeRideRequest}
          layout={layout}
        />
      )
    }
  }

  render() {
    const { layout } = this.props;

    return (
      <View>
        {this.renderRideDetails()}
        {this.renderRideMap()}
        {this.renderRideDriver()}
        {this.renderRideCar()}
        {this.renderRideOffer()}
        {this.renderRideRequests()}
      </View>
    );
  }
}
