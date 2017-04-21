// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import pluralize from 'pluralize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// styles
import stylesColors from '../../../constants/colors';

// components
import { PriceFormatted } from '../../shared/price-formatted/price-formatted'

const styles = (layout) => StyleSheet.create({
  borderDriver: {
    borderLeftColor: stylesColors[layout].rideAsDriver,
    borderLeftWidth: 6,
  },
  borderNormal: {
    borderLeftColor: stylesColors[layout].rideDefault,
    borderLeftWidth: 6,
  },
  borderPassengerpending: {
    borderLeftColor: stylesColors[layout].rideAsPassengerPending,
    borderLeftWidth: 6,
  },
  borderPassengerrejected: {
    borderLeftColor: stylesColors[layout].rideAsPassengerRejected,
    borderLeftWidth: 6,
  },
  borderPassengeraccepted: {
    borderLeftColor: stylesColors[layout].rideAsPassengerAccepted,
    borderLeftWidth: 6,
  },
  container: {
    backgroundColor: stylesColors[layout].ridePastBg,
    margin: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    borderColor: stylesColors[layout].rideBorder,
    borderBottomWidth: 1,
  },
  imageAvatar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  imageCar: {
    width: 70,
    height: 70,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  location: {
    fontSize: 16,
    color: stylesColors[layout].ridePastText,
  },
  placesCount: {
    color: stylesColors[layout].ridePastText,
  },
  placesFull: {
    color: stylesColors[layout].placesFull,
  },
  price: {
    alignSelf: 'flex-start',
    marginLeft: -5,
    marginTop: 7,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: stylesColors[layout].priceBg,
    color: stylesColors[layout].priceText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: stylesColors[layout].ridePastText,
  },
  rideDriverInfo: {
    alignItems: 'flex-end',
    marginRight: 5,
  },
  rideDriverInfoPending: {
    color: stylesColors[layout].rideAsPassengerPending,
  },
});

export class RidesIndexItemPast extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
    showUserModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  showUserModal() {
    const { ride, showUserModal } = this.props;

    showUserModal(ride)
  }

  showRide() {
    const { navigation, ride, layout, hideModal } = this.props;

    if (hideModal) hideModal()
    if (navigation) {
      navigation.navigate('rideShow', {ride: ride, layout: layout})
    }
  }

  isRidePast() {
    return moment().diff(new Date(this.props.ride.start_date)) < 0
  }

  renderRide() {
    const { ride, layout, navigation } = this.props;

    return(
      <TouchableHighlight
        style={styles(layout).container}
        underlayColor={stylesColors[layout].secondaryBg}
        onPress={this.showRide.bind(this)}
      >
        <View style={{flexDirection: 'row'}}>
          <View style={styles(layout)[this.rideBorderStyle()]}></View>
          <View style={{flex: 1}}>
            <View style={styles(layout).header}>
              <View>
                <Image source={{uri: ride.car.car_photo}} style={styles(layout).imageCar}>
                  <Text style={styles(layout).price}>
                    <PriceFormatted price={ride.price} currency={ride.currency} />
                  </Text>
                </Image>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles(layout).location}>{ride.start_location_address}</Text>
                <Text style={styles(layout).location}>{ride.destination_location_address}</Text>
                {this.renderPendingRequestsCount()}
              </View>
            </View>
            <View style={styles(layout).footer}>
              <Text style={styles(layout).primaryText}>
                {moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={() => this.showUserModal()}
                >
                  <Image source={{uri: ride.driver.avatar}} style={styles(layout).imageAvatar} />
                </TouchableHighlight>
                {this.renderFreePlacesCount()}
                <MaterialIcons.Button
                  name="open-in-new"
                  backgroundColor="transparent"
                  iconStyle={{marginRight: 0}}
                  color={stylesColors[layout].buttonSubmit}
                  size={25}
                  onPress={() => this.showRide.bind(this)}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  rideBorderStyle() {
    const { ride, layout } = this.props;

    switch (ride.user_role) {
    case "driver":
      return "borderDriver"
    case "passenger":
      return `borderPassenger${ride.user_ride_request_status}`
    default:
      return "borderNormal"
    }
  }

  renderPendingRequestsCount() {
    const { ride, layout } = this.props;

    if (ride.user_role === 'driver') {
      if (ride.ride_requests_pending_count > 0) {
        return (
          <View style={styles(layout).rideDriverInfo}>
            <Text style={styles(layout).rideDriverInfoPending}>
              {`${ride.ride_requests_pending_count} ${pluralize('request', ride.ride_requests_pending_count)} pending`}
            </Text>
          </View>
        )
      } else {
        return null
      }
    }
  }

  renderFreePlacesCount() {
    const { ride, layout } = this.props;

    if (ride.free_places_count === 0) {
      return <Text style={styles(layout).placesFull}>All taken</Text>
    } else {
      return <Text style={styles(layout).placesCount}>{ride.free_places_count} seats free</Text>
    }
  }

  render() {
    return this.renderRide()
  }
};
