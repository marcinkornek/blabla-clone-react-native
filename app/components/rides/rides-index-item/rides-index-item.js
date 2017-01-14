// utils
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
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
      <ListItem
        onPress={() => this.goToRide(ride.id)}
        key={ride.id}
        title={`${ride.start_city} - ${ride.destination_city}`}
        subtitle={`${moment(ride.starts_date).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
      />
    )
  }
};
