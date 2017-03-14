// utils
import React, { Component, PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import pluralize from 'pluralize'
import moment from 'moment';
import { Button } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: stylesColors.primaryBg,
  },
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  acceptButton: {
    marginRight: 0,
    marginBottom: 5,
  },
  rejectButton: {
    marginRight: 0,
  },
});

export class RideRequestsIndexItem extends Component {
  static propTypes = {
    handleOnClick: PropTypes.func.isRequired,
  }

  handleAcceptClick () {
    const { rideRequest, handleOnClick } = this.props

    handleOnClick(rideRequest.id, 'accepted')
  }

  handleRejectClick () {
    const { rideRequest, handleOnClick } = this.props

    handleOnClick(rideRequest.id, 'rejected')
  }

  renderRideRequestInfo() {
    const { rideRequest } = this.props

    return (
      <View>
        <Text>Ride request from {rideRequest.passenger.full_name}</Text>
        <Text>Requested {rideRequest.places} {pluralize('place', rideRequest.places)} ({rideRequest.status})</Text>
        <Text>requested: {moment(new Date(rideRequest.created_at)).fromNow()}</Text>
      </View>
    )
  }

  renderRideRequestButtons() {
    const { rideRequest } = this.props

    if (rideRequest.status === 'pending') {
      return (
        <View>
          <Button
            raised
            title='Accept'
            backgroundColor={stylesColors.statusAccepted}
            buttonStyle={styles.acceptButton}
            onPress={this.handleAcceptClick.bind(this)}
          />
          <Button
            raised
            title='Reject'
            backgroundColor={stylesColors.statusRejected}
            buttonStyle={styles.rejectButton}
            onPress={this.handleRejectClick.bind(this)}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.container}>
          {this.renderRideRequestInfo()}
          {this.renderRideRequestButtons()}
        </View>
      </View>
    )
  }
}
