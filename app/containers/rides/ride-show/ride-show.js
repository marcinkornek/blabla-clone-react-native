// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

// actions
import { fetchRide } from '../../../actions/rides';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'

export class RideShow extends Component {
  componentDidMount() {
    const { rideId, fetchRide } = this.props

    fetchRide(rideId)
  }

  renderRide() {
    const { ride } = this.props

    if (ride) {
      return (
        <View>
          <Text>{ride.start_city} - {ride.destination_city}</Text>
          <Text>Date: {moment(ride.starts_date).format('DD.MM.YY')}</Text>
          <Text>Time: {moment(ride.starts_date).format('H:mm')}</Text>
          <Text>Price: {ride.price} {ride.currency}</Text>
          <Text>Car: {ride.car.full_name}</Text>
          <Text>Driver: {ride.driver.full_name}</Text>
        </View>
      )
    }
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <View style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderRide()}
        </AsyncContent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
  }
});

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
  }
};

const mapDispatchToProps = {
  fetchRide,
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
