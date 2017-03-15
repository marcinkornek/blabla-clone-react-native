// utils
import React, { Component, PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import pluralize from 'pluralize'
import moment from 'moment';
import { Button } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  acceptButton: {
    marginRight: 0,
    marginBottom: 5,
  },
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
  rejectButton: {
    marginRight: 0,
  },
  view: {
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: stylesColors[layout].secondaryBg,
  },
});

export class RideRequestsIndexItem extends Component {
  static propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
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
    const { rideRequest, layout } = this.props

    return (
      <View>
        <Text style={styles(layout).primaryText}>Ride request from {rideRequest.passenger.full_name}</Text>
        <Text style={styles(layout).primaryText}>Requested {rideRequest.places} {pluralize('place', rideRequest.places)} ({rideRequest.status})</Text>
        <Text style={styles(layout).primaryText}>requested: {moment(new Date(rideRequest.created_at)).fromNow()}</Text>
      </View>
    )
  }

  renderRideRequestButtons() {
    const { rideRequest, layout } = this.props

    if (rideRequest.status === 'pending') {
      return (
        <View>
          <Button
            raised
            title='Accept'
            backgroundColor={stylesColors[layout].statusAccepted}
            buttonStyle={styles(layout).acceptButton}
            onPress={this.handleAcceptClick.bind(this)}
          />
          <Button
            raised
            title='Reject'
            backgroundColor={stylesColors[layout].statusRejected}
            buttonStyle={styles(layout).rejectButton}
            onPress={this.handleRejectClick.bind(this)}
          />
        </View>
      )
    }
  }

  render() {
    const { layout } = this.props

    return (
      <View style={styles(layout).view}>
        <View style={styles(layout).container}>
          {this.renderRideRequestInfo()}
          {this.renderRideRequestButtons()}
        </View>
      </View>
    )
  }
}
