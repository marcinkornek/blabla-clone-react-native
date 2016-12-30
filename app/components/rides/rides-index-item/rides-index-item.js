// utils
import React, { Component, PropTypes } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

export class RidesIndexItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired
  }

  goToRide(rideId) {
    Actions.rideShow({rideId: rideId});
  }

  render() {
    const { ride } = this.props;

    return(
      <TouchableHighlight onPress={() => this.goToRide(ride.id)}>
        <View>
          <Text>{ride.start_city} - {ride.destination_city} - {ride.price} {ride.currency}</Text>
          <Text>{moment(ride.starts_date).format('DD.MM.YY - H:mm')}</Text>
        </View>
      </TouchableHighlight>
    )
  }
};
