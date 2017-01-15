// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import moment from 'moment';

// actions
import { fetchRide } from '../../../actions/rides';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'

export class RideShow extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }

  static defaultProps = {
    currentUser: {},
    ride: {
      car: {},
      driver: {}
    }
  }

  componentDidMount() {
    const { rideId, fetchRide } = this.props

    fetchRide(rideId)
  }

  componentDidUpdate(oldProps) {
    const { ride } = this.props;

    if (ride !== oldProps.ride) {
      Actions.refresh({
        rideId: ride.id,
        title: `${ride.start_city} - ${ride.destination_city}`,
      })
    }
  }

  renderRightTitle() {
    const { ride, currentUser } = this.props;

    if (ride.driver.id === currentUser.id) {
      return "Edit"
    } else {
      return undefined
    }
  }

  renderRightAction() {
    const { ride, currentUser } = this.props;

    if (ride.driver.id === currentUser.id) {
      return () => Actions.rideEdit({rideId: ride.id})
    } else {
      return undefined
    }
  }

  renderRide() {
    const { ride } = this.props

    return (
      <View>
        {this.renderActions()}
        <Text>{ride.start_city} - {ride.destination_city}</Text>
        <Text>Date: {moment(ride.starts_date).format('DD.MM.YY')}</Text>
        <Text>Time: {moment(ride.starts_date).format('H:mm')}</Text>
        <Text>Price: {ride.price} {ride.currency}</Text>
        <Text>Car: {ride.car.full_name}</Text>
        <Text>Driver: {ride.driver.full_name}</Text>
      </View>
    )
  }

  renderActions() {
    const { ride, currentUser } = this.props;

    if (ride.driver.id == currentUser.id) {
      return (
        <Button
          raised
          title='Edit car'
          backgroundColor='#ff4c4c'
          onPress={() => Actions.rideEdit({rideId: ride.id})}
        />
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
    currentUser: state.session.item,
  }
};

const mapDispatchToProps = {
  fetchRide,
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
