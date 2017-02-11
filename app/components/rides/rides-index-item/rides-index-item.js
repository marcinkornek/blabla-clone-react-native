// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

export class RidesIndexItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired
  }

  renderAvatar() {
    const { ride, withCarPhoto } = this.props;

    if (withCarPhoto) {
      return ride.car.car_photo
    } else if (ride.driver) {
      return ride.driver.avatar
    }
  }

  renderRide() {
    const { ride } = this.props;

    switch (ride.user_role) {
    case "driver":
      return this.renderRideAsDriver()
    case "passenger":
      return this.renderRideAsPassenger()
    default:
      return this.renderNormalRide()
    }
  }

  renderNormalRide() {
    const { ride, navigation } = this.props;

    return (
      <ListItem
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
      />
    )
  }

  renderRideAsDriver() {
    const { ride, navigation } = this.props;

    return (
      <ListItem
        containerStyle={{backgroundColor: '#edf3fd'}}
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
      />
    )
  }

  renderRideAsPassenger() {
    const { ride, navigation } = this.props;
    const color = this.rideAsPassengerColor()

    return (
      <ListItem
        containerStyle={{backgroundColor: color}}
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
      />
    )
  }

  rideAsPassengerColor() {
    const { ride } = this.props;

    switch (ride.user_ride_request_status) {
    case "pending":
      return '#fff0cc'
    case "rejected":
      return '#ffe5e5'
    case "accepted":
      return '#e6f4e5'
    default:
      return 'white'
    }
  }

  render() {
    return this.renderRide()
  }
};
