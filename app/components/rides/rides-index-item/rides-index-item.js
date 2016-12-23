// utils
import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

export class RidesIndexItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired
  }

  render() {
    const { ride } = this.props;

    return(
      <Text>
        {ride.start_city} - {ride.destination_city}
      </Text>
    )
  }
};
