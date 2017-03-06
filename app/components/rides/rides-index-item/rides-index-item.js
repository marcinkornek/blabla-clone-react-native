// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

const styles = StyleSheet.create({
  orange: {
    color: 'orange',
  },
  green: {
    color: 'green',
  },
  rideAsDriverContainter: {
    backgroundColor: '#edf3fd',
  },
  rideAsDriverRightTitle: {
    flex: 0,
    width: 80,
    marginLeft: 5,
  },
});

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

  renderPendingRequestsCount() {
    const { ride } = this.props;

    if (ride.ride_requests_pending_count > 0) {
      return <Text style={styles.orange}>{`${ride.ride_requests_pending_count} pending`}</Text>
    } else {
      return null
    }
  }

  renderFreePlacesCount() {
    const { ride } = this.props;

    if (ride.free_places_count === 0) {
      return <Text style={styles.green}>All taken </Text>
    } else {
      return <Text>{ride.free_places_count} seats free </Text>
    }
  }

  renderRideAsDriver() {
    const { ride, navigation } = this.props;

    rightTitle =
      <Text>
        {this.renderFreePlacesCount()}
        {this.renderPendingRequestsCount()}
      </Text>

    return (
      <ListItem
        containerStyle={styles.rideAsDriverContainter}
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
        rightTitle={rightTitle}
        rightTitleContainerStyle={styles.rideAsDriverRightTitle}
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
