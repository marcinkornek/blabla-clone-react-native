// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  placesCount: {
    color: stylesColors[layout].primaryText,
  },
  rideFull: {
    color: stylesColors[layout].rideFull,
  },
  rideContainer: {
    backgroundColor: stylesColors[layout].primaryBg,
    borderLeftColor: stylesColors[layout].rideDefault,
    borderBottomColor: stylesColors[layout].primaryBorder,
    borderLeftWidth: 5,
    borderBottomWidth: 2,
  },
  rideAsDriverContainter: {
    backgroundColor: stylesColors[layout].primaryBg,
    borderLeftColor: stylesColors[layout].rideAsDriver,
    borderBottomColor: stylesColors[layout].primaryBorder,
    borderLeftWidth: 5,
    borderBottomWidth: 2,
  },
  rideAsDriverRightTitle: {
    flex: 0,
    width: 80,
    marginLeft: 5,
  },
  rideTitle: {
    color: stylesColors[layout].primaryText,
  },
  rideSubtitle: {
    color: stylesColors[layout].secondaryText,
  },
  statusPending: {
    color: stylesColors[layout].statusPending,
  },
});

export class RidesIndexItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
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

  renderPendingRequestsCount() {
    const { ride, layout } = this.props;

    if (ride.ride_requests_pending_count > 0) {
      return <Text style={styles(layout).statusPending}>{`${ride.ride_requests_pending_count} pending`}</Text>
    } else {
      return null
    }
  }

  renderFreePlacesCount() {
    const { ride, layout } = this.props;

    if (ride.free_places_count === 0) {
      return <Text style={styles(layout).rideFull}>All taken </Text>
    } else {
      return <Text style={styles(layout).placesCount}>{ride.free_places_count} seats free </Text>
    }
  }

  renderNormalRide() {
    const { ride, layout, navigation } = this.props;

    return (
      <ListItem
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
        underlayColor={stylesColors[layout].secondaryBg}
        containerStyle={styles(layout).rideContainer}
        titleStyle={styles(layout).rideTitle}
        subtitleStyle={styles(layout).rideSubtitle}
      />
    )
  }

  renderRideAsDriver() {
    const { ride, layout, navigation } = this.props;

    rightTitle =
      <Text>
        {this.renderFreePlacesCount()}
        {this.renderPendingRequestsCount()}
      </Text>

    return (
      <ListItem
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
        rightTitle={rightTitle}
        rightTitleContainerStyle={styles(layout).rideAsDriverRightTitle}
        containerStyle={styles(layout).rideAsDriverContainter}
        titleStyle={styles(layout).rideTitle}
        subtitleStyle={styles(layout).rideSubtitle}
      />
    )
  }

  renderRideAsPassenger() {
    const { ride, layout, navigation } = this.props;
    const color = this.rideAsPassengerColor()

    return (
      <ListItem
        onPress={() => navigation.navigate('rideShow', {id: ride.id})}
        key={ride.id}
        title={`${ride.start_location.address} - ${ride.destination_location.address}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
        containerStyle={[styles(layout).rideContainer, {borderLeftColor: color, borderLeftWidth: 5}]}
        titleStyle={styles(layout).rideTitle}
        subtitleStyle={styles(layout).rideSubtitle}
      />
    )
  }

  rideAsPassengerColor() {
    const { ride, layout } = this.props;

    switch (ride.user_ride_request_status) {
    case "pending":
      return stylesColors[layout].rideAsPassengerPending
    case "rejected":
      return stylesColors[layout].rideAsPassengerRejected
    case "accepted":
      return stylesColors[layout].rideAsPassengerAccepted
    default:
      return stylesColors[layout].rideDefault
    }
  }

  render() {
    return this.renderRide()
  }
};
