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
import { RidesIndexItemFuture } from '../rides-index-item-future/rides-index-item-future'
import { RidesIndexItemPast } from '../rides-index-item-past/rides-index-item-past'

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
    backgroundColor: stylesColors[layout].rideBg,
    margin: 5,
  },
  containerPast: {
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
    color: stylesColors[layout].primaryText,
  },
  placesCount: {
    color: stylesColors[layout].primaryText,
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
    color: stylesColors[layout].primaryText,
  },
  rideDriverInfo: {
    alignItems: 'flex-end',
    marginRight: 5,
  },
  rideDriverInfoPending: {
    color: stylesColors[layout].rideAsPassengerPending,
  },
});

export class RidesIndexItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
    showUserModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  isRidePast() {
    return moment().diff(new Date(this.props.ride.start_date)) < 0
  }

  render() {
    if (this.isRidePast()) {
      return <RidesIndexItemFuture {...this.props} />
    } else {
      return <RidesIndexItemPast {...this.props} />
    }
  }
};
