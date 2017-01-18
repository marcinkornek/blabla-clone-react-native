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
import { RenderUserProfile } from '../../../components/shared/render-user-profile/render-user-profile'

const styles = StyleSheet.create({
  view: {
    marginTop: 80,
  }
});

export class RideShow extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
  }

  static defaultProps = {
    currentUser: {},
    ride: {
      start_city: {},
      destination_city: {},
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
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) {
      return "Edit"
    } else {
      return undefined
    }
  }

  renderRightAction() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) {
      return () => Actions.rideEdit({rideId: ride.id})
    } else {
      return undefined
    }
  }

  renderRide() {
    const { ride } = this.props

    return (
      <View>
        <Text>{ride.start_city.address} - {ride.destination_city.address}</Text>
        <Text>Date: {moment(ride.starts_date).format('DD.MM.YY')}</Text>
        <Text>Time: {moment(ride.starts_date).format('H:mm')}</Text>
        <Text>Price: {ride.price} {ride.currency}</Text>
        <Text>Car: {ride.car.full_name}</Text>
        <Text>Driver: {ride.driver.full_name}</Text>
      </View>
    )
  }

  renderDriver() {
    return(
      <RenderUserProfile user={this.props.ride.driver} />
    )
  }

  componentDidUpdate(oldProps) {
    const { ride } = this.props;

    if (ride !== oldProps.ride) {
      Actions.refresh({
        rideId: ride.id,
        title: `${ride.start_city.address} - ${ride.destination_city.address}`,
        rightTitle: this.renderRightTitle(),
        onRight: this.renderRightAction()
      })
    }
  }

  renderRightTitle() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) {
      return "Edit"
    }
  }

  renderRightAction() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) return () => Actions.rideEdit({rideId: ride.id})
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <View style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderRide()}
          {this.renderDriver()}
        </AsyncContent>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
    currentUserId: state.session.item.id,
  }
};

const mapDispatchToProps = {
  fetchRide,
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
