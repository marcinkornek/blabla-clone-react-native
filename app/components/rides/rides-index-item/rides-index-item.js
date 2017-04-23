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
