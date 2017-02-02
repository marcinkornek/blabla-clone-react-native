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

  renderAvatar() {
    const { ride, withCarPhoto } = this.props;

    if (withCarPhoto) {
      return ride.car.car_photo
    } else if (ride.driver) {
      return ride.driver.avatar
    }
  }

  render() {
    const { ride } = this.props;

    return(
      <ListItem
        onPress={() => Actions.rideShow({rideId: ride.id})}
        key={ride.id}
        title={`${ride.start_location} - ${ride.destination_location}`}
        subtitle={`${moment(new Date(ride.start_date)).format('DD.MM.YY - H:mm')} - ${ride.price} ${ride.currency}`}
        avatar={{uri: this.renderAvatar()}}
      />
    )
  }
};
